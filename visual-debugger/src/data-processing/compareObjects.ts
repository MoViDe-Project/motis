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
    for (const key of keys1) {
        // recursively check the legs attribute and evaluate it for equality
        switch (key) {
            case "legs": {
                let minLegs = Math.min(currentItinerary.legs.length, currentDefaultItinerary.legs.length);
                for (let i = 0; i < minLegs; i++) {
                    let falseAttributesOfLeg = compareLegs(currentItinerary.legs[i], currentDefaultItinerary.legs[i])
                    if (falseAttributesOfLeg.length != 0) {
                        mismatchedAttributes.push(falseAttributesOfLeg)
                        mismatchedAttributes[0].push("legs")
                    }
                }
                break;

            }
            default: {
                let result = true;
                if (!deepEqual(currentItinerary[key], currentDefaultItinerary[key])) {
                    mismatchedAttributes[0].push(key);
                    result = false
                }
                break;
            }
        }
    }

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
                    return true
                }
                return true
            }
        }
    });
    //console.log(mismatchedAttributes);
    return mismatchedAttributes
}

/**
 * Builds the "ShadowObject" that stores the matched or mismatched information for the currently computed itinerary
 * Essentially copies the itinerary objects and replaces all attributes with a boolean that says whether the given attribute is matched
 */
export function buildShadowOfItinerary() {

    // gets the itineraries from their stores
    currentItineraryStore.subscribe((data) => {
        itinerary = data
    })

    currentDefaultPlanStore.subscribe((data) => {
        defaultItinerary = data.itineraries[itinerary.index]
    })

    // gather the mismatched attributes
    let falseAttributes = compareItineraries(itinerary, defaultItinerary)

    let maxLegs = Math.max(defaultItinerary.legs.length, itinerary.legs.length)
    let shadow: ItineraryShadow = new ItineraryShadow(maxLegs)

    Object.entries(shadow).forEach(([key]) => {
        // set all attributes except for "legs" to false if they are marked as mismatched
        if (!(key == "legs") && falseAttributes[0].includes(key)) {
            // @ts-ignore
            shadow[key as keyof ItineraryShadow] = false;
        }
        let minLegs = Math.min(itinerary.legs.length, defaultItinerary.legs.length)
        setShadowLegFalse(shadow.legs.slice(minLegs, maxLegs))

        // build leg shadow objects
        if (key == "legs" && falseAttributes[0].includes("legs")) {
            for (let i = 0; i < minLegs; i++) {
                shadow.legs[i] = setShadowLegAttributes(shadow.legs[i], falseAttributes[i + 1])
            }
        }
    });

    shadowItineraryStore.set(shadow)
}

/**
 * Builds the "ShadowObject" that stores the matched or mismatched information for the currently computed itinerary
 * Essentially copies the itinerary objects and replaces all attributes with a boolean that says whether the given attribute is matched
 */
export function buildShadowOfDefaultItinerary() {

    // gets the itineraries from their stores
    currentDefaultItineraryStore.subscribe((data) => {
        itinerary = data
    })

    currentPlanStore.subscribe((data) => {
        defaultItinerary = data.itineraries[itinerary.index]
    })

    let falseAttributes = compareItineraries(itinerary, defaultItinerary)
    let maxLegs = Math.max(defaultItinerary.legs.length, itinerary.legs.length)

    let shadow: ItineraryShadow = new ItineraryShadow(maxLegs)

    Object.entries(shadow).forEach(([key]) => {
        // set all attributes except for "legs" to false if they are marked as mismatched
        if (!(key == "legs") && falseAttributes[0].includes(key)) {
            // @ts-ignore
            shadow[key as keyof ItineraryShadow] = false;
        }
        let minLegs = Math.min(itinerary.legs.length, defaultItinerary.legs.length)
        setShadowLegFalse(shadow.legs.slice(minLegs, maxLegs))

        // build leg shadow objects
        if (key == "legs" && falseAttributes[0].includes("legs")) {
            for (let i = 0; i < minLegs; i++) {
                shadow.legs[i] = setShadowLegAttributes(shadow.legs[i], falseAttributes[i + 1])
            }
        }
    });

    defaultShadowItineraryStore.set(shadow)
}

/**
 * Sets all parameters of leg listed in falseAttributes to false
 * @param leg leg to set the attributes for
 * @param falseAttributes attributes that should be set to false
 */
function setShadowLegAttributes(leg: LegShadow, falseAttributes: string[]) {
    Object.entries(leg).forEach(([key]) => {

        if (falseAttributes.includes(key)) {
            leg[key as keyof LegShadow] = false
        }

    })
    return leg
}

/**
 * sets all parameters of an array of shadowLegs false to ensure every leg has shadowLegs
 * @param legs array of shadowLegs that has no matching counterpart of comparison shadow
 */
function setShadowLegFalse(legs: LegShadow[]): void {
    legs.forEach(leg => {
        Object.keys(leg).forEach((key) => {
            (leg as any)[key] = false;

        });
    });
}
