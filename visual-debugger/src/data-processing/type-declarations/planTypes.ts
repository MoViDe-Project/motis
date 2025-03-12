import {itineraryStates} from "@data/styling/cssClasses.ts";

/**
 *  Plan type used for parsing plan responses
 */
export class Plan {
    requestParameters: string = "";
    debugOutput: number[] = [];
    from: Place = new Place();
    to: Place = new Place();
    direct: Itinerary[] = new Array<Itinerary>();
    itineraries: Itinerary[] = new Array<Itinerary>();
    previousPageCursor: string = "";
    nextPageCursor: string = "";
}

/**
 * Place type used for parsing plan responses
 */
export class Place {
    name: string = "";
    stopId: string = "";
    lat: number = 0;
    lon: number = 0;
    level: number = 0;
    arrival: string = "";
    departure: string = "";
    scheduledArrival: string = "";
    scheduledDeparture: string = "";
    scheduledTrack: string = "";
    track: string = "";
    vertexType: string = "";
}

/**
 * Itinerary type used for parsing plan responses
 */
export class Itinerary {
    duration: number = 0;
    startTime: string = "";
    endTime: string = "";
    transfers: number = 0;
    legs: Leg[] = new Array<Leg>();
    cssClass: string = itineraryStates.planEntryDefault;
    index: number = 0;
}


export class Leg {
    /**
     * Transport mode for this leg
     */
    mode: Mode = 'WALK';
    from: Place = new Place();
    to: Place = new Place();
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
    duration: number = 0;
    /**
     * leg departure time
     */
    startTime: string = "";
    /**
     * leg arrival time
     */
    endTime: string = "";
    /**
     * scheduled leg departure time
     */
    scheduledStartTime: string = "";
    /**
     * scheduled leg arrival time
     */
    scheduledEndTime: string = "";
    /**
     * Whether there is real-time data about this leg
     */
    realTime: boolean = true;
    /**
     * For non-transit legs the distance traveled while traversing this leg in meters.
     */
    distance?: number = 0;
    /**
     * For transit legs, if the rider should stay on the vehicle as it changes route names.
     */
    interlineWithPreviousLeg?: boolean = true;
    /**
     * For transit legs, the headsign of the bus or train being used.
     * For non-transit legs, null
     *
     */
    headsign?: string = "";
    routeColor?: string = "";
    routeTextColor?: string = "";
    routeType?: string = "";
    agencyName?: string = "";
    agencyUrl?: string = "";
    agencyId?: string = "";
    tripId?: string = "";
    routeShortName?: string = "";
    /**
     * Filename and line number where this trip is from
     */
    source?: string = "";
    /**
     * For transit legs, intermediate stops between the Place where the leg originates
     * and the Place where the leg ends. For non-transit legs, null.
     *
     */
    intermediateStops?: Array<Place>;
    legGeometry: EncodedPolyline = new EncodedPolyline();
    /**
     * A series of turn by turn instructions
     * used for walking, biking and driving.
     *
     */
    steps?: Array<StepInstruction>;
    rental?: Rental;
}

export type Mode =
    'WALK'
    | 'BIKE'
    | 'RENTAL'
    | 'CAR'
    | 'CAR_PARKING'
    | 'TRANSIT'
    | 'TRAM'
    | 'SUBWAY'
    | 'FERRY'
    | 'AIRPLANE'
    | 'METRO'
    | 'BUS'
    | 'COACH'
    | 'RAIL'
    | 'HIGHSPEED_RAIL'
    | 'LONG_DISTANCE'
    | 'NIGHT_RAIL'
    | 'REGIONAL_FAST_RAIL'
    | 'REGIONAL_RAIL'
    | 'OTHER';

export type RentalFormFactor =
    'BICYCLE'
    | 'CARGO_BICYCLE'
    | 'CAR'
    | 'MOPED'
    | 'SCOOTER_STANDING'
    | 'SCOOTER_SEATED'
    | 'OTHER';

export type RentalPropulsionType =
    'HUMAN'
    | 'ELECTRIC_ASSIST'
    | 'ELECTRIC'
    | 'COMBUSTION'
    | 'COMBUSTION_DIESEL'
    | 'HYBRID'
    | 'PLUG_IN_HYBRID'
    | 'HYDROGEN_FUEL_CELL';

export type RentalReturnConstraint = 'NONE' | 'ANY_STATION' | 'ROUNDTRIP_STATION';

export type Direction =
    'DEPART'
    | 'HARD_LEFT'
    | 'LEFT'
    | 'SLIGHTLY_LEFT'
    | 'CONTINUE'
    | 'SLIGHTLY_RIGHT'
    | 'RIGHT'
    | 'HARD_RIGHT'
    | 'CIRCLE_CLOCKWISE'
    | 'CIRCLE_COUNTERCLOCKWISE'
    | 'STAIRS'
    | 'ELEVATOR'
    | 'UTURN_LEFT'
    | 'UTURN_RIGHT';

/**
 * EncodedPolyline type used for parsing plan responses
 */
export class EncodedPolyline {
    points: string = "";
    length: number = 0;
}

export type StepInstruction = {
    relativeDirection: Direction;
    /**
     * The distance in meters that this step takes.
     */
    distance: number;
    /**
     * level where this segment starts, based on OpenStreetMap data
     */
    fromLevel: number;
    /**
     * level where this segment starts, based on OpenStreetMap data
     */
    toLevel: number;
    /**
     * OpenStreetMap way index
     */
    osmWay?: number;
    polyline: EncodedPolyline;
    /**
     * The name of the street.
     */
    streetName: string;
    /**
     * Not implemented!
     * When exiting a highway or traffic circle, the exit name/number.
     *
     */
    exit: string;
    /**
     * Not implemented!
     * Indicates whether a street changes direction at an intersection.
     *
     */
    stayOn: boolean;
    /**
     * Not implemented!
     * This step is on an open area, such as a plaza or train platform,
     * and thus the directions should say something like "cross"
     *
     */
    area: boolean;
};

export type Rental = {
    /**
     * Vehicle share system ID
     */
    systemId: string;
    /**
     * Vehicle share system name
     */
    systemName?: string;
    /**
     * URL of the vehicle share system
     */
    url?: string;
    /**
     * Name of the station
     */
    stationName?: string;
    /**
     * Rental URI for Android (deep link to the specific station or vehicle)
     */
    rentalUriAndroid?: string;
    /**
     * Rental URI for iOS (deep link to the specific station or vehicle)
     */
    rentalUriIOS?: string;
    /**
     * Rental URI for web (deep link to the specific station or vehicle)
     */
    rentalUriWeb?: string;
    formFactor?: RentalFormFactor;
    propulsionType?: RentalPropulsionType;
    returnConstraint?: RentalReturnConstraint;
};
