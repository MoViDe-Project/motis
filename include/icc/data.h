#pragma once

#include <memory>

#include "cista/memory_holder.h"

#include "nigiri/types.h"

#include "osr/types.h"

#include "icc/compute_footpaths.h"
#include "icc/match_platforms.h"
#include "icc/types.h"

namespace osr {
struct ways;
struct platforms;
struct lookup;
}  // namespace osr

namespace nigiri {
struct timetable;
struct rt_timetable;
}  // namespace nigiri

namespace icc {

struct elevators;

template <typename T>
struct point_rtree;

template <typename T>
using ptr = std::unique_ptr<T>;

struct rt {
  ptr<nigiri::rt_timetable> rtt_;
  ptr<elevators> e_;
};

struct data {
  explicit data(std::filesystem::path const&);
  ~data();

  bool has_tt() const { return tt_ != nullptr; }
  bool has_osr() const { return w_ != nullptr; }
  bool has_platforms() const { return pl_ != nullptr; }

  nigiri::timetable const& tt() const { return **tt_; }

  ptr<osr::ways> w_;
  ptr<osr::platforms> pl_;
  ptr<osr::lookup> l_;
  ptr<cista::wrapped<nigiri::timetable>> tt_;
  ptr<point_rtree<nigiri::location_idx_t>> location_rtee_;
  ptr<platform_matches_t> matches_;
  std::shared_ptr<rt> rt_;
};

}  // namespace icc