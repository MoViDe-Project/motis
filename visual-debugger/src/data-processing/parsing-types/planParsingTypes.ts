/**
 *  Plan type used for parsing plan responses
 */
export interface Plan{
    requestParameters:string;
    debugOutput: number[];
    from:Place;
    to: Place;
    direct: Itinerary[];
    itineraries: Itinerary[];
    previousPageCursor: string;
    nextPageCursor: string;
}

/**
 * Place type used for parsing plan responses
 */
export interface Place{
    name:string;
    stopId:string;
    lat:number;
    lon:number;
    level: number;
    arrival: string;
    departure:string;
    scheduledArrival: string;
    scheduledDeparture: string;
    scheduledTrack:string;
    track:string;
    vertexType:string;
}

/**
 * Itinerary type used for parsing plan responses
 */
export interface Itinerary {
    duration:number;
    startTime:string;
    endTime:string;
    transfers:number;
    legs:Leg[];
}

/**
 * Leg type used for parsing plan responses
 */
export interface Leg {
    mode:string;
    from:Place;
    to:Place;
    duration:number;
    startTime:string;
    endTime:string;
    scheduledStartTime:string;
    scheduledEndTime:string;
    realTime:boolean;
    legGeometry:EncodedPolyline;
}

/**
 * EncodedPolyline type used for parsing plan responses
 */
export interface EncodedPolyline {
    points:string;
    length:number;
}