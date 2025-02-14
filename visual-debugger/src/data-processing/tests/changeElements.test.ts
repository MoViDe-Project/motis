import { changePlan } from "@data/changeElements"
import { Plan } from "@data/type-declarations/planTypes"
import { activeQueryStore, currentDefaultPlanStore, currentPlanStore, defaultPlanDatasetStore, planDatasetStore } from "sveltestore"
import { test, expect, vi } from "vitest"

// TODO: Mock stores properly(?)
// vi.mock('sveltestore')

// Static inputs
const inputPlan: Plan = new Plan()
const defaultPlan: Plan = new Plan()

test('changePlan: Happy path', () => {
    // Init inputs
    const index: number = 1
    planDatasetStore.set([inputPlan]);
    defaultPlanDatasetStore.set([defaultPlan])

    // Init changed variables
    let activeQuery: number = -1 
    let currentPlan: Plan | undefined = undefined
    let currentDefaultPlan: Plan | undefined = undefined

    // Access stores
    activeQueryStore.subscribe((d) => {activeQuery = d})
    currentPlanStore.subscribe((d) => {currentPlan = d})
    currentDefaultPlanStore.subscribe((d) => {currentDefaultPlan = d})

    // Function call
    changePlan(index)

    // Assertions
    expect(activeQuery).toBe(1)
    expect(currentPlan).toBe(inputPlan)
    expect(currentDefaultPlan).toBe(defaultPlan)
})

test('changePlan: Index out of bounds', () => {
    expect(changePlan(-1)).toThrowError("Index out of bounds")
})

test('changePlan: planDatesetStore is empty', () => {
    planDatasetStore.set([]);
    defaultPlanDatasetStore.set([defaultPlan])

    expect(changePlan(1)).toThrowError()
})

test('changePlan: defaultPlanDatasetStore is empty', () => {
    planDatasetStore.set([inputPlan]);
    defaultPlanDatasetStore.set([])

    expect(changePlan(1)).toThrowError()
})

test('changeItinerary: Happy path', () => {
})

test('changeItinerary: Index out of bounds', () => {
})

test('changeItinerary: currentPlanStore is empty', () => {
})

test('changeItinerary: currentDefaultPlanStore is empty', () => {
})
