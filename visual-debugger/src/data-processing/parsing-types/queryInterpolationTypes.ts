/**
 * location type used for storing stop information
 */
export interface Location {
    type: string;
    tokens: number[][];
    name: string;
    id: string;
    lat: number;
    lon: number;
    level: number;
    zip: string;
    areas: Area[];
    score: number;
}

/**
 * area type used for storing information about the area of a stop
 */
export interface Area {
    name: string;
    adminLevel: number;
    matched: boolean;
    default: boolean;
}

/**
 * Query type used for storing information about a single query
 */
export interface Query {
    index: number;
    from:string;
    fromStopID:string;
    to: string;
    toStopID: string;
    class:string;
    time:string;
}

/**
 * Type used for storing all queries in a Batch
 */
export interface Batch {
    queries: Query[];
}