import {writable} from "svelte/store";
import {Query} from "@data/type-declarations/queryTypes.ts";
import {Itinerary, Plan} from "@data/type-declarations/planTypes.ts";
import {ItineraryShadow} from "@data/type-declarations/comparisonShadows.ts";


/**
 * Creates a Svelte writable store that persists its value to localStorage.
 * The store will initialize with the value from localStorage if available,
 * otherwise it will use the provided initial value.
 * 
 * @template T - The type of the value to be stored.
 * @param {string} key - The key under which the value is stored in localStorage.
 * @param {T} initialValue - The initial value to use if there is no value in localStorage.
 * @returns {Writable<T>} A Svelte writable store that persists its value to localStorage.
 * 
 * @example
 * ```typescript
 * import { persistentStore } from './sveltestore';
 * 
 * const count = persistentStore<number>('count', 0);
 * count.subscribe(value => {
 *   console.log(value); // Logs the current value of the store
 * });
 * count.set(1); // Updates the store and persists the value to localStorage
 * ```
 */
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
        /*
            This block subscribes to changes in the Svelte store. Whenever the store's value changes, 
            the new value is serialized to a JSON string and saved to localStorage 
            under the specified key. If an error occurs during this process (e.g., if localStorage is full), 
            it logs the error to the console.
        */
        store.subscribe((value) => {
            try {
                localStorage.setItem(key, JSON.stringify(value));
            } catch (error) {
                console.error(`Error writing localStorage key "${key}":`, error);
            }
        });

        // Listen for updates from other tabs.
        /*
            This block sets up an event listener for the storage event on the window object. 
            The storage event is triggered when localStorage is modified in another tab. 
            If the event's key matches the specified key and there is a new value, the 
            store is updated with the new value by parsing the JSON string. 
            This ensures that changes to the store's value in one tab are reflected in other tabs.
        */
        window.addEventListener("storage", (event) => {
            if (event.key === key && event.newValue) {
                store.set(JSON.parse(event.newValue) as T);
            }
        });
    }
    // Return the store
    return store;
}

/**
 * Resets all stores to their initial values and clears the corresponding localStorage entries.
 */
export function resetStores() {
    // Reset persistent stores
    currentItineraryStore.set(new Itinerary());
    currentDefaultItineraryStore.set(new Itinerary());
    shadowItineraryStore.set(new ItineraryShadow(1));
    defaultShadowItineraryStore.set(new ItineraryShadow(1));

    // Reset writable stores
    interpolatedQueryStore.set([]);
    currentPlanStore.set(new Plan());
    planDatasetStore.set([]);
    currentDefaultPlanStore.set(new Plan());
    defaultPlanDatasetStore.set([]);
    activeQueryIndexStore.set(0);
    activeItineraryIndexStore.set(0);
    activeDefaultItineraryIndexStore.set(0);

    // Optionally, remove the keys from localStorage if needed.
    if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
        localStorage.removeItem("currentItineraryStore");
        localStorage.removeItem("currentDefaultItineraryStore");
        localStorage.removeItem("shadowItineraryStore");
        localStorage.removeItem("defaultShadowItineraryStore");
    }
}

/**
 * Storage for interpolated queries
 */
export const interpolatedQueryStore = writable<Query[]>([]);

/**
 * Storage for current displayed plan
 */
export const currentPlanStore = writable<Plan>(new Plan());

/**
 * Storage for all currently computed plan data
 */
export const planDatasetStore = writable<Plan[]>([]);

/**
 * Storage for the current default plan
 */
export const currentDefaultPlanStore = writable<Plan>(new Plan());

/**
 * Storage for all plans that are part of the default plan set
 */
export const defaultPlanDatasetStore = writable<Plan[]>([]);

/**
 * Storage for the current itinerary
 */
export const currentItineraryStore = persistentStore<Itinerary>("currentItineraryStore", new Itinerary());

/**
 * Storage for the default itinerary
 */
export const currentDefaultItineraryStore = persistentStore<Itinerary>("currentDefaultItineraryStore", new Itinerary());

/**
 * Storage for the Index of the active query
 */
export const activeQueryIndexStore = writable<number>(0);

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
export const shadowItineraryStore = persistentStore<ItineraryShadow>("shadowItineraryStore",new ItineraryShadow(1))

/**
 * Storage for the shadow objects of the current itinerary
 */
export const defaultShadowItineraryStore = persistentStore<ItineraryShadow>("defaultShadowItineraryStore",new ItineraryShadow(1))