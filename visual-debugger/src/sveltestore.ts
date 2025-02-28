import {writable} from "svelte/store";
import {Query} from "@data/type-declarations/queryTypes.ts";
import {Itinerary, Plan} from "@data/type-declarations/planTypes.ts";
import {ItineraryShadow} from "@data/type-declarations/comparisonShadows.ts";

function persistentStore<T>(key: string, initialValue: T) {
    let storedValue: T = initialValue;

    // Check if we're running in the browser
    if (typeof window !== "undefined") {
        try {
            const json = localStorage.getItem(key);
            storedValue = json ? JSON.parse(json) as T : initialValue;
        } catch (error) {
            console.error(`Error reading localStorage key "${key}":`, error);
            storedValue = initialValue;
        }
    }

    const store = writable<T>(storedValue);

    // Subscribe to changes only if in the browser
    if (typeof window !== "undefined") {
        store.subscribe((value) => {
            try {
                localStorage.setItem(key, JSON.stringify(value));
            } catch (error) {
                console.error(`Error writing localStorage key "${key}":`, error);
            }
        });

        // Listen for updates from other tabs.
        window.addEventListener("storage", (event) => {
            if (event.key === key && event.newValue) {
                store.set(JSON.parse(event.newValue) as T);
            }
        });
    }

    return store;
}

/**
 * Storage for interpolated queries
 */
export const interpolatedQueryStore = persistentStore<Query[]>("interpolatedQueryStore", []);

/**
 * Storage for current displayed plan
 */
export const currentPlanStore = persistentStore<Plan>("currentPlanStore", new Plan());

/**
 * Storage for all currently computed plan data
 */
export const planDatasetStore = persistentStore<Plan[]>("planDatasetStore", []);

/**
 * Storage for the current default plan
 */
export const currentDefaultPlanStore = persistentStore<Plan>("currentDefaultPlanStore", new Plan());

/**
 * Storage for all plans that are part of the default plan set
 */
export const defaultPlanDatasetStore = persistentStore<Plan[]>("defaultPlanDatasetStore", []);

/**
 * Storage for the current itinerary
 */
export const currentItineraryStore = persistentStore<Itinerary>("currentItineraryStore", new Itinerary());

/**
 * Storage for the default itinerary
 */
export const currentDefaultItineraryStore = persistentStore<Itinerary>("currentDefaultItineraryStore", new Itinerary());

/**
 * Storage for the number of the active query
 */
export const activeQueryStore = persistentStore<number>("activeQueryStore", 0);

export const activeQueryStore = writable<number>(0)

/**
 * Storage for the number of the active plan
 */
export const activeItineraryIndexStore = writable<number>(0)

/**
 * Storage for the number of the active default plan
 */
export const activeDefaultItineraryIndexStore = writable<number>(0)

/**
 * Storage for the shadow objects of the current itinerary
 */
export const shadowItineraryStore = writable<ItineraryShadow>(new ItineraryShadow(1))

/**
 * Storage for the shadow objects of the current itinerary
 */
export const defaultShadowItineraryStore = writable<ItineraryShadow>(new ItineraryShadow(1))