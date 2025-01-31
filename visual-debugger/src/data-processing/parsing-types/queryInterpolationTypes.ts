/**
 * location type used for storing stop information
 */
export class Location {
    type: string = "";
    tokens: number[][] = [[]];
    name: string = "";
    id: string = "";
    lat: number = 0;
    lon: number = 0;
    level: number = 0;
    zip: string = "";
    areas: Area[] = new Array<Area>();
    score: number = 0;
}

/**
 * area type used for storing information about the area of a stop
 */
export class Area {
    name: string = "";
    adminLevel: number = 0;
    matched: boolean = true;
    default: boolean = true;
}

/**
 * Query type used for storing information about a single query
 */
export class Query {
    index: number = 0;
    from: string = "";
    fromStopID: string = "";
    to: string = "";
    toStopID: string = "";
    class: string = "";
    time: string = "";
}

/**
 * Type used for storing all queries in a Batch
 */
export class Batch {
    queries: Query[] = new Array<Query>();
}