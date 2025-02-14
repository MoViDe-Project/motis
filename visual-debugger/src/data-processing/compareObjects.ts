import {Itinerary, Leg} from "@data/type-declarations/planTypes.ts";
// @ts-ignore
import deepEqual from "deep-equal";


export function compareItineraries(currentItinerary: Itinerary, currentDefaultItinerary: Itinerary): boolean {
    // First, check if the number of keys are the same
    const keys1 = Object.keys(currentItinerary) as (keyof Itinerary)[];


    // Compare the values of each key in both objects
    return keys1.every((key) => {

        if (key == "legs") {
            let result = true;
            for (let i = 0; i < currentItinerary.legs.length; i++) {
                if (compareLegs(currentItinerary.legs[i], currentDefaultItinerary.legs[i]).length != 0) {
                    result = false;
                }
            }
            return result;
        }

        return deepEqual(currentItinerary[key], currentDefaultItinerary[key]);
    });
}

/**
 * Compares the parameters and puts the mismatched attributes in a list
 * @returns an array with the mismatched attributes of the function parameters
 * @param currentLeg
 * @param currentDefaultLeg
 */
function compareLegs(currentLeg: Leg, currentDefaultLeg: Leg): string[] {

    let mismatchedAttributes: string[] = []

    const keys1 = Object.keys(currentLeg) as (keyof Leg)[];

    keys1.every((key) => {
        switch (key) {
            case "source":
                return true
            case "tripId":
                return true
            default: {
                if (!deepEqual(currentLeg[key], currentDefaultLeg[key])) {
                    mismatchedAttributes.push(key);
                    return true
                }
                return true
            }
        }
    });

    return mismatchedAttributes
}