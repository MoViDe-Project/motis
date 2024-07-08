#include "icc/journey_to_response.h"

#include "utl/enumerate.h"

#include "osr/routing/route.h"

#include "geo/polyline_format.h"

#include "nigiri/routing/journey.h"
#include "nigiri/rt/frun.h"
#include "nigiri/rt/gtfsrt_resolve_run.h"
#include "nigiri/special_stations.h"
#include "nigiri/timetable.h"
#include "nigiri/types.h"

#include "icc/constants.h"

namespace n = nigiri;

namespace icc {

std::int64_t to_ms(n::unixtime_t const t) {
  return std::chrono::duration_cast<std::chrono::milliseconds>(
             t.time_since_epoch())
      .count();
}

std::int64_t to_seconds(n::i32_minutes const t) {
  return std::chrono::duration_cast<std::chrono::seconds>(t).count();
}

std::int64_t to_ms(n::i32_minutes const t) {
  return std::chrono::duration_cast<std::chrono::milliseconds>(t).count();
}

api::Place to_place(n::timetable const& tt, n::location_idx_t const l) {
  auto const pos = tt.locations_.coordinates_[l];
  auto const type = tt.locations_.types_.at(l);
  auto const is_track = (type == n::location_type::kGeneratedTrack ||
                         type == n::location_type::kTrack);
  auto const p = is_track ? tt.locations_.parents_.at(l) : l;
  auto const track =
      is_track ? std::optional{std::string{tt.locations_.names_.at(l).view()}}
               : std::nullopt;
  return {.name_ = std::string{tt.locations_.names_[p].view()},
          .lat_ = pos.lat_,
          .lon_ = pos.lng_,
          .track_ = track,
          .vertexType_ = api::VertexTypeEnum::NORMAL};
}

std::string to_str(n::color_t const c) {
  return fmt::format("{:06x}", to_idx(c) & 0x00ffffff);
}

std::string get_service_date(n::timetable const& tt,
                             n::transport const t,
                             n::stop_idx_t const stop_idx) {
  auto const o = tt.transport_first_dep_offset_[t.t_idx_];
  auto const utc_dep =
      tt.event_mam(t.t_idx_, stop_idx, n::event_type::kDep).as_duration();
  auto const gtfs_static_dep = utc_dep + o;
  auto const [day_offset, tz_offset_minutes] =
      n::rt::split_rounded(gtfs_static_dep - utc_dep);
  auto const day = (tt.internal_interval_days().from_ +
                    std::chrono::days{to_idx(t.day_)} - day_offset);
  return fmt::format("{:%Y-%m-%d}", day);
}

api::Itinerary journey_to_response(
    osr::ways const& w,
    osr::lookup const& l,
    n::timetable const& tt,
    osr::platforms const& pl,
    n::rt_timetable const* rtt,
    osr::bitvec<osr::node_idx_t> const* blocked,
    vector_map<nigiri::location_idx_t, osr::platform_idx_t> const& matches,
    bool const wheelchair,
    n::routing::journey const& j,
    place_t const& start,
    place_t const& dest) {
  auto const to_location = [&](n::location_idx_t const l) {
    switch (to_idx(l)) {
      case static_cast<n::location_idx_t::value_t>(n::special_station::kStart):
        assert(std::holds_alternative<osr::location>(start));
        return std::get<osr::location>(start);
      case static_cast<n::location_idx_t::value_t>(n::special_station::kEnd):
        assert(std::holds_alternative<osr::location>(dest));
        return std::get<osr::location>(dest);
      default:
        return osr::location{tt.locations_.coordinates_[l],
                             pl.get_level(w, matches[l])};
    }
  };

  auto cache =
      hash_map<std::tuple<osr::location, osr::location, osr::search_profile>,
               std::optional<osr::path>>{};
  auto const add_routed_polyline = [&](osr::search_profile const profile,
                                       osr::location const& from,
                                       osr::location const& to, api::Leg& leg) {
    auto const key = std::tuple{from, to, profile};
    auto const it = cache.find(key);
    auto const path = it != end(cache)
                          ? it->second
                          : osr::route(w, l, profile, from, to, 3600,
                                       osr::direction::kForward,
                                       kMaxMatchingDistance, blocked);
    if (it == end(cache)) {
      cache.emplace(std::pair{key, path});
    }

    if (!path.has_value()) {
      if (it == end(cache)) {
        std::cout << "no path found: " << from << " -> " << to
                  << ", profile=" << to_str(profile) << "\n";
      }
      return;
    }

    leg.legGeometryWithLevels_ =
        utl::to_vec(path->segments_, [&](osr::path::segment const& s) {
          return api::LevelEncodedPolyline{
              .from_level_ = to_float(s.from_level_),
              .to_level_ = to_float(s.to_level_),
              .osm_way_ = s.way_ == osr::way_idx_t ::invalid()
                              ? std::nullopt
                              : std::optional{static_cast<std::int64_t>(
                                    to_idx(w.way_osm_idx_[s.way_]))},
              .polyline_ = {encode_polyline(s.polyline_),
                            static_cast<std::int64_t>(s.polyline_.size())},
          };
        });

    auto concat = geo::polyline{};
    for (auto const& p : path->segments_) {
      utl::concat(concat, p.polyline_);
    }
    leg.legGeometry_.points_ = encode_polyline(concat);
    leg.legGeometry_.length_ = concat.size();
  };

  auto itinerary = api::Itinerary{
      .duration_ = to_seconds(j.arrival_time() - j.departure_time()),
      .startTime_ = to_ms(j.departure_time()),
      .endTime_ = to_ms(j.arrival_time()),
      .transfers_ = std::max(
          0L, utl::count_if(j.legs_, [](auto&& leg) {
                return holds_alternative<n::routing::journey::run_enter_exit>(
                    leg.uses_);
              }) - 1)};

  for (auto const [leg_i, j_leg] : utl::enumerate(j.legs_)) {
    auto const write_leg = [&](auto&& x,
                               api::ModeEnum const mode) -> api::Leg& {
      auto& leg = itinerary.legs_.emplace_back();
      leg.mode_ = mode;
      leg.from_ = to_place(tt, j_leg.from_);
      leg.to_ = to_place(tt, j_leg.to_);
      leg.from_.departure_ = leg.startTime_ = to_ms(j_leg.dep_time_);
      leg.to_.arrival_ = leg.endTime_ = to_ms(j_leg.arr_time_);
      leg.duration_ = to_seconds(j_leg.arr_time_ - j_leg.dep_time_);
      return leg;
    };

    std::visit(
        utl::overloaded{
            [&](n::routing::journey::run_enter_exit const& t) {
              // TODO interlining
              auto const fr = n::rt::frun{tt, rtt, t.r_};
              auto const enter_stop = fr[t.stop_range_.from_];
              auto const exit_stop = fr[t.stop_range_.to_ - 1U];
              auto const color = enter_stop.get_route_color();
              auto const agency = enter_stop.get_provider();

              auto& leg = write_leg(t, api::ModeEnum::TRANSIT);
              leg.source_ = fmt::format("{}", fmt::streamed(fr.dbg()));
              leg.headsign_ = enter_stop.direction();
              leg.routeColor_ = to_str(color.color_);
              leg.routeTextColor_ = to_str(color.text_color_);
              leg.realTime_ = fr.is_rt();
              leg.tripId_ = fr.id().id_;  // TODO source_idx
              leg.serviceDate_ = get_service_date(tt, t.r_.t_, 0U),
              leg.agencyName_ = agency.long_name_;
              leg.agencyId_ = agency.short_name_;
              leg.routeShortName_ = enter_stop.trip_display_name();
              leg.departureDelay_ =
                  to_ms(enter_stop.delay(n::event_type::kDep));
              leg.arrivalDelay_ = to_ms(exit_stop.delay(n::event_type::kArr));

              leg.intermediateStops_ = std::vector<api::Place>{};
              auto polyline = geo::polyline{};
              for (auto i = t.stop_range_.from_ + 1U;
                   i < t.stop_range_.to_ - 1U; ++i) {
                auto const stop = fr[t.stop_range_.from_];
                auto& p = leg.intermediateStops_->emplace_back(
                    to_place(tt, stop.get_location_idx()));
                p.departure_ = to_ms(stop.time(n::event_type::kDep));
                p.departureDelay_ = to_ms(stop.delay(n::event_type::kDep));
                p.arrival_ = to_ms(stop.time(n::event_type::kDep));
                p.arrivalDelay_ = to_ms(stop.delay(n::event_type::kDep));
                polyline.emplace_back(stop.pos());
              }
              leg.legGeometry_.points_ = geo::encode_polyline(polyline);
              leg.legGeometry_.length_ = polyline.size();
            },
            [&](n::footpath const fp) {
              auto& leg = write_leg(fp, api::ModeEnum::WALK);
              add_routed_polyline(wheelchair ? osr::search_profile::kWheelchair
                                             : osr::search_profile::kFoot,
                                  to_location(j_leg.from_),
                                  to_location(j_leg.to_), leg);
            },
            [&](n::routing::offset const x) {
              auto& leg = write_leg(x, api::ModeEnum{x.transport_mode_id_});
              add_routed_polyline(
                  static_cast<osr::search_profile>(x.transport_mode_id_),
                  to_location(j_leg.from_), to_location(j_leg.to_), leg);
            }},
        j_leg.uses_);
  }

  return itinerary;
}

}  // namespace icc