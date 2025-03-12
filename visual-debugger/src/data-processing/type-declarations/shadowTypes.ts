/**
 * The shadow objects in this class are used to track whether the attributes of the displayed itineraries are equal
 */

export class LegShadow {
    /**
     * Transport mode for this leg
     */
    mode: boolean = true
    from: boolean = true
    to: boolean = true
    /**
     * Leg duration in seconds
     *
     * If leg is footpath:
     * The footpath duration is derived from the default footpath
     * duration using the query parameters `transferTimeFactor` and
     * `additionalTransferTime` as follows:
     * `leg.duration = defaultDuration * transferTimeFactor + additionalTransferTime.`
     * In case the defaultDuration is needed, it can be calculated by
     * `defaultDuration = (leg.duration - additionalTransferTime) / transferTimeFactor`.
     * Note that the default values are `transferTimeFactor = 1` and
     * `additionalTransferTime = 0` in case they are not explicitly
     * provided in the query.
     *
     */
    duration: boolean = true
    /**
     * leg departure time
     */
    startTime: boolean = true
    /**
     * leg arrival time
     */
    endTime: boolean = true
    /**
     * scheduled leg departure time
     */
    scheduledStartTime: boolean = true
    /**
     * scheduled leg arrival time
     */
    scheduledEndTime: boolean = true
    /**
     * Whether there is real-time data about this leg
     */
    realTime: boolean = true
    /**
     * For non-transit legs the distance traveled while traversing this leg in meters.
     */
    distance?: boolean = true
    /**
     * For transit legs, if the rider should stay on the vehicle as it changes route names.
     */
    interlineWithPreviousLeg?: boolean = true
    /**
     * For transit legs, the headsign of the bus or train being used.
     * For non-transit legs, null
     *
     */
    headsign?: boolean = true
    routeColor?: boolean = true
    routeTextColor?: boolean = true
    routeType?: boolean = true
    agencyName?: boolean = true
    agencyUrl?: boolean = true
    agencyId?: boolean = true
    tripId?: boolean = true
    routeShortName?: boolean = true
    /**
     * Filename and line number where this trip is from
     */
    source?: boolean = true
    /**
     * For transit legs, intermediate stops between the Place where the leg originates
     * and the Place where the leg ends. For non-transit legs, null.
     *
     */
    intermediateStops: boolean = true
    legGeometry: boolean = true
    /**
     * A series of turn by turn instructions
     * used for walking, biking and driving.
     *
     */
    steps?: boolean = true
    rental?: boolean = true
}

export class ItineraryShadow {
    duration: boolean = true;
    startTime: boolean = true;
    endTime: boolean = true;
    transfers: boolean = true;
    legs: LegShadow[];
    index: boolean = true;

    constructor(numberOfLegs: number) {
        this.legs = []
        for (let i = 0; i < numberOfLegs; i++) {
            this.legs.push(new LegShadow());
        }
    }
}

export class ItineraryAttributesShadow{
    duration: boolean = true;
    startTime: boolean = true;
    endTime: boolean = true;
    transfers: boolean = true;
}