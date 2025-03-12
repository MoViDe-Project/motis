import { changeDefaultItinerary, changeItinerary, changePlan } from "@data/changeElements"
import { Itinerary, Plan } from "@data/type-declarations/planTypes"
import { activeQueryIndexStore, currentDefaultItineraryStore, currentDefaultPlanStore, currentItineraryStore, currentPlanStore, defaultPlanDatasetStore, planDatasetStore } from "sveltestore"
import { test, expect, vi, describe } from "vitest"

// TODO: Mock stores properly(?)
// vi.mock('sveltestore')

// Static inputs
const inputPlan: Plan = new Plan()
const defaultPlan: Plan = new Plan()
const inputItinerary: Itinerary = new Itinerary()
const defaultItinerary: Itinerary = new Itinerary()

inputPlan.itineraries = [ inputItinerary ] 
defaultPlan.itineraries = [ defaultItinerary ] 

describe('changePlan', () => {
    // URGENT TODO: Something is wrong with the construction of objects of type Plan
    test('Happy path', () => {
        // Init inputs
        const index: number = 0
        planDatasetStore.set([inputPlan]);
        defaultPlanDatasetStore.set([defaultPlan])

        // Init changed variables
        let activeQuery: number = -1 
        let currentPlan: Plan | undefined = undefined
        let currentDefaultPlan: Plan | undefined = undefined

        // Access stores
        activeQueryIndexStore.subscribe((d) => {activeQuery = d})
        currentPlanStore.subscribe((d) => {currentPlan = d})
        currentDefaultPlanStore.subscribe((d) => {currentDefaultPlan = d})

        // Function call
        changePlan(index)

        // Assertions
        expect(activeQuery).toBe(0)
        expect(currentPlan).toBe(inputPlan)
        expect(currentDefaultPlan).toBe(defaultPlan)
    })

    test('Index out of bounds', () => {
        expect(() => changePlan(-1)).toThrowError("Index out of bounds")
    })

    test('planDatesetStore is empty', () => {
        planDatasetStore.set([]);
        defaultPlanDatasetStore.set([defaultPlan])

        expect(() => changePlan(1)).toThrowError("Plan store is empty")
    })

    test('defaultPlanDatasetStore is empty', () => {
        planDatasetStore.set([inputPlan]);
        defaultPlanDatasetStore.set([])

        expect(() => changePlan(1)).toThrowError("Default plan store is empty")
    })
})

describe('changeItinerary', () => {
    test('Happy path', () => {
        currentPlanStore.set(inputPlan)
        let currentItinerary: Itinerary | undefined = undefined
        currentItineraryStore.subscribe((d) => { currentItinerary = d})

        changeItinerary(0)

        expect(currentItinerary).toBe(inputItinerary)
    })

    test('Index out of bounds', () => {
        expect(() => changeItinerary(-1)).toThrowError("Index out of bounds")
    })
})

describe('changeDefaultItinerary', () => {
    test('Happy path', () => {
        currentDefaultPlanStore.set(defaultPlan)
        let currentDefaultItinerary: Itinerary | undefined = undefined
        currentDefaultItineraryStore.subscribe((d) => { currentDefaultItinerary = d })

        changeDefaultItinerary(0)

        expect(currentDefaultItinerary).toBe(defaultItinerary)
    })

    test('Index out of bounds', () => {
        expect(() => changeDefaultItinerary(-1)).toThrowError("Index out of bounds")
    })
})
