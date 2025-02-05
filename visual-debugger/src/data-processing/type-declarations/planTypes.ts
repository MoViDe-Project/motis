import {cssClasses} from "@data/styling/cssClasses.ts";

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
    cssClass: string = "";
    match: boolean = false;
    index: number = 0;
}

/**
 * Leg type used for parsing plan responses
 */
export class Leg {
    mode: string = "";
    from: Place = new Place();
    to: Place = new Place();
    duration: number = 0;
    startTime: string = "";
    endTime: string = "";
    scheduledStartTime: string = "";
    scheduledEndTime: string = "";
    realTime: boolean = true;
    legGeometry: EncodedPolyline = new EncodedPolyline();
    headsign: string = "";
    routeShortName: string = "";
}

/**
 * EncodedPolyline type used for parsing plan responses
 */
export class EncodedPolyline {
    points: string = "";
    length: number = 0;
}