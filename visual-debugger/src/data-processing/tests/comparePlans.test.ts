import { vi, test, expect } from "vitest"
import { comparePlans } from '@data/comparePlans'
import { Itinerary, Plan } from "@data/type-declarations/planTypes"
import { currentDefaultPlanStore, currentPlanStore, defaultPlanDatasetStore, planDatasetStore } from "sveltestore"
import { cssClasses } from "@data/styling/cssClasses"

// Static inputs
const inputPlan: Plan = new Plan()
const defaultPlan: Plan = new Plan()
const inputItinerary: Itinerary = new Itinerary()
const defaultItinerary: Itinerary = new Itinerary()

inputPlan.itineraries = [ inputItinerary ] 
defaultPlan.itineraries = [ defaultItinerary ] 

test('comparePlans: Happy path', () => {
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
    expect(currentPlan.itineraries[0].cssClass).toBe(cssClasses.planEntryValid)
    expect(currentDefaultPlan.itineraries[0].cssClass).toBe(cssClasses.planEntryValid)
})

test('comparePlans: planDatasetStore is empty', () => {
    // TODO: Include proper spy for function alert

    planDatasetStore.set([])
    defaultPlanDatasetStore.set([defaultPlan])
    
    expect(comparePlans()).toThrowError()
})

test('comparePlans: defaultPlanDatesetStore is empty', () => {
    // TODO: Include proper spy for function alert

    planDatasetStore.set([inputPlan])
    defaultPlanDatasetStore.set([])

    expect(comparePlans()).toThrowError()
})
