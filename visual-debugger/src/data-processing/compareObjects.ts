import {Itinerary, Leg} from "@data/type-declarations/planTypes.ts";
// @ts-ignore
import deepEqual from "deep-equal";

/**
 * compares the parameters and returns true when all of their attributes are equal in value
 * @param currentItinerary
 * @param currentDefaultItinerary
 */
export function compareItineraries(currentItinerary: Itinerary, currentDefaultItinerary: Itinerary): boolean {
    // First, check if the number of keys are the same
    const keys1 = Object.keys(currentItinerary) as (keyof Itinerary)[];


    // Compare the values of each key in both objects
    return keys1.every((key) => {

        // recursively check the legs attribute and evaluate it for equality
        if (key == "legs") {
            let result = true;
            for (let i = 0; i < currentItinerary.legs.length; i++) {
                if (compareLegs(currentItinerary.legs[i], currentDefaultItinerary.legs[i]).length != 0) {
                    result = false;
                }
            }
            return result;
        }

        // evaluate all attributes except legs for equality
        return deepEqual(currentItinerary[key], currentDefaultItinerary[key]);
    });
}

/**
 * Compares the parameters and puts the mismatched attributes in a list
 * IMPORTANT: excludes the source and tripId parameters because they are not deterministic
 * @returns an array with the mismatched attributes of the function parameters
 * @param currentLeg
 * @param currentDefaultLeg
 */
function compareLegs(currentLeg: Leg, currentDefaultLeg: Leg): string[] {

    let mismatchedAttributes: string[] = []

    //get list of attributes
    const keys1 = Object.keys(currentLeg) as (keyof Leg)[];

    // iterates over all attributes
    keys1.every((key) => {

        // exclude "source" and "tripId" parameters and evaluate the rest
        switch (key) {
            case "source":
                return true
            case "tripId":
                return true
            default: {
                // add the attribute name to the list if the parameters differ in value
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