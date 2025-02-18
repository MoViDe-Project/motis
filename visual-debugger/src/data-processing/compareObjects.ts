import {Itinerary, Leg} from "@data/type-declarations/planTypes.ts";
// @ts-ignore
import deepEqual from "deep-equal";
import {ItineraryShadow, LegShadow} from "@data/type-declarations/comparisonShadows.ts";
import {
    currentDefaultItineraryStore,
    currentDefaultPlanStore,
    currentItineraryStore,
    currentPlanStore, defaultShadowItineraryStore, shadowItineraryStore
} from "sveltestore";

let itinerary: Itinerary = new Itinerary();
let defaultItinerary: Itinerary = new Itinerary();


/**
 * compares the parameters and returns a string array of all attributes that are not equal
 * The first element of the return marks the false attributes of the itinerary itself, all other elements are the false attributes of their respective legs
 * @param currentItinerary
 * @param currentDefaultItinerary
 */
export function compareItineraries(currentItinerary: Itinerary, currentDefaultItinerary: Itinerary): string[][] {
    // First, check if the number of keys are the same
    const keys1 = Object.keys(currentItinerary) as (keyof Itinerary)[];

    let mismatchedAttributes: string[][] = [[]]

    // Compare the values of each key in both objects
    keys1.every((key) => {

        // recursively check the legs attribute and evaluate it for equality
        if (key == "legs") {
            let result = true;
            for (let i = 0; i < currentItinerary.legs.length; i++) {
                let falseAttributesOfLeg = compareLegs(currentItinerary.legs[i], currentDefaultItinerary.legs[i])
                if (falseAttributesOfLeg.length != 0) {
                    mismatchedAttributes.push(falseAttributesOfLeg)
                    mismatchedAttributes[0].push("legs")
                }
            }
            return result;
        }

        // evaluate all attributes except legs for equality
        let result = true;
        if (!deepEqual(currentItinerary[key], currentDefaultItinerary[key])) {
            mismatchedAttributes[0].push(key);
            result = false;
        }
        return result;
    });

    return mismatchedAttributes;
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
                    return false
                }
                return true
            }
        }
    });
    console.log(mismatchedAttributes);
    return mismatchedAttributes
}

/**
 *
 */
export function buildShadowObjects() {

    currentItineraryStore.subscribe((data) => {
        itinerary = data
    })

    currentDefaultPlanStore.subscribe((data) => {
        defaultItinerary = data.itineraries[itinerary.index]
    })

    let falseAttributes = compareItineraries(itinerary, defaultItinerary)

    let shadow: ItineraryShadow = new ItineraryShadow(itinerary.legs.length)

    Object.entries(shadow).forEach(([key]) => {
        if (!(key == "legs") && falseAttributes[0].includes(key)) {
            // @ts-ignore
            shadow[key as keyof ItineraryShadow] = false;
        }

        // build leg shadow objects
        if (key == "legs") {
            for (let i = 1; i < shadow.legs.length; i++) {
                shadow.legs[i] = buildLegShadowObject(shadow.legs[i], falseAttributes[i])
            }
        }
    });

    shadowItineraryStore.set(shadow)
}

export function buildDefaultShadowObjects() {
    currentDefaultItineraryStore.subscribe((data) => {
        itinerary = data
    })

    currentPlanStore.subscribe((data) => {
        defaultItinerary = data.itineraries[itinerary.index]
    })

    let falseAttributes = compareItineraries(itinerary, defaultItinerary)

    let shadow: ItineraryShadow = new ItineraryShadow(itinerary.legs.length)

    Object.entries(shadow).forEach(([key]) => {
        if (!(key == "legs") && falseAttributes[0].includes(key)) {
            // @ts-ignore
            shadow[key as keyof ItineraryShadow] = false;
        }

        // build leg shadow objects
        if (key == "legs") {

            for (let i = 1; i < shadow.legs.length; i++) {
                shadow.legs[i] = buildLegShadowObject(shadow.legs[i], falseAttributes[i])
            }
        }
    });

    defaultShadowItineraryStore.set(shadow)
}

function buildLegShadowObject(leg: LegShadow, falseAttributes: string[]) {
    Object.entries(leg).forEach(([key]) => {

        if (falseAttributes.includes(key)) {
            leg[key as keyof LegShadow] = false
        }

    })
    return leg
}