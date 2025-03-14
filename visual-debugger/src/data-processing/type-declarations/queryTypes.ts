/**
 * Query type used for storing information about a single query
 */
export class Query {
    index: number = 0;
    from: Stop = new Stop();
    to: Stop = new Stop();
    time: string = "";
}

/**
 * Stop type used for query parsing
 */
export class Stop {
    name: string = "";
    latitude: number = 0;
    longitude: number = 0;
    level: number = 0;
    stopId: string = "";
}