import { changePlan } from "@data/changeElements"
import { test, expect, vi } from "vitest"

vi.mock("sveltestore");

test('changePlan: Happy path', () => {
})

test('changePlan: Index out of bounds', () => {
    expect(changePlan(-1)).toThrowError("Index out of bounds")
})

test('changePlan: planDatesetStore is empty', () => {
})

test('changePlan: defaultPlanDatasetStore is empty', () => {
})

test('changeItinerary: Happy path', () => {
})

test('changeItinerary: Index out of bounds', () => {
})

test('changeItinerary: currentPlanStore is empty', () => {
})

test('changeItinerary: currentDefaultPlanStore is empty', () => {
})
