import { vi, test, expect, describe } from "vitest"
import { comparePlans } from '@data/comparePlans'
import { Itinerary, Plan } from "@data/type-declarations/planTypes"
import { currentDefaultPlanStore, currentPlanStore, defaultPlanDatasetStore, planDatasetStore } from "sveltestore"
import { itineraryStates } from "@data/styling/cssClasses"

// Static inputs
const inputPlan: Plan = new Plan()
const defaultPlan: Plan = new Plan()
const inputItinerary: Itinerary = new Itinerary()
const defaultItinerary: Itinerary = new Itinerary()

inputPlan.itineraries = [ inputItinerary ] 
defaultPlan.itineraries = [ defaultItinerary ] 

describe('comparePlans', () => {
    test('Happy path', () => {
        planDatasetStore.set([inputPlan])
        defaultPlanDatasetStore.set([defaultPlan])

        let currentPlan: Plan = new Plan()
        let currentDefaultPlan: Plan = new Plan()

        currentPlanStore.subscribe((d) => { currentPlan = d })
        currentDefaultPlanStore.subscribe((d) => { currentDefaultPlan = d })

        comparePlans()

        // Test store contents
        expect(currentPlan).toBe(inputPlan)
        expect(defaultPlan).toBe(defaultPlan)

        // Test CSS classes
        expect(currentPlan.itineraries[0].cssClass).toBe(itineraryStates.planEntryValid)
        expect(currentDefaultPlan.itineraries[0].cssClass).toBe(itineraryStates.planEntryValid)
    })

    /* The following two test are skipped due to technical limits and lack of docs
     * To be concrete: Mocking alert is non-trivial as it would require an instantiated object Window
     * This does not exist in unit testing, only in browsers
     * A similiar case is found in ./queryBuild.test.ts
     *
     * CURRENTLY: The manual testing routine covers those cases as a part of UX testing
     */
    test.skip('planDatasetStore is empty', () => {
        planDatasetStore.set([])
        defaultPlanDatasetStore.set([defaultPlan])
        
        expect(comparePlans()).toThrowError()
    })

    test.skip('defaultPlanDatesetStore is empty', () => {
        planDatasetStore.set([inputPlan])
        defaultPlanDatasetStore.set([])

        expect(comparePlans()).toThrowError()
    })
})
