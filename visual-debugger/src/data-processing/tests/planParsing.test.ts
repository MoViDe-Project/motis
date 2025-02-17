import { test, expect, vi, describe, expectTypeOf } from "vitest";
import { computePlan, computePlanForQuery, downloadPlans } from "@data/planParsing";
import axios from "axios"
import { currentPlanStore, interpolatedQueryStore, planDatasetStore } from "sveltestore";
import { Query } from "@data/type-declarations/queryTypes";
import { Plan } from "@data/type-declarations/planTypes";

vi.mock('axios')
const dummy = new Plan()

describe('computePlan', () => {
    test('Happy path', () => {
        let interpolatedQueries = []
        interpolatedQueryStore.subscribe((x) => { interpolatedQueries = x })

        // TODO: Test heavily depends on outside function computePlanForQuery
    })

    test('interpolatedQueryStore is empty', () => {
        // Set input store data
        interpolatedQueryStore.set([])

        // Set stores to checkable elements
        planDatasetStore.set([dummy])
        currentPlanStore.set(dummy)

        // Set store data 
        let planDataset: Plan[] = []
        let currentPlan: Plan = new Plan()
        planDatasetStore.subscribe((x) => { planDataset = x })
        currentPlanStore.subscribe((x) => { currentPlan = x })

        // Call function
        computePlan()

        // Assertions: Nothing happens
        expect(planDataset).toEqual([dummy])
        expect(currentPlanStore).toEqual(dummy)
    })
})

// TODO: Discuss relevance
describe('computePlanForQuery', () => {
    test('Happy path', () => {
        // TODO: Test heavily depends on axios and a running instance of MOTIS
    })

    test('Invalid query', async () => {
        let x: Query = new Query()

        await expect(computePlanForQuery(x)).rejects.toThrowError("Query is invalid")
    })
})

// TODO: Discuss relevance
describe('downloadPlans', () => {
    test('downloadPlans: Happy path')

    test('downloadPlans: planDatasetStore is empty')
})
