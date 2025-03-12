import {test, expect, vi, describe, expectTypeOf, assert} from "vitest";
import {computePlan, computePlanForQuery, downloadPlans} from "@data/planParsing";
import axios from "axios"
import {currentPlanStore, interpolatedQueryStore, planDatasetStore} from "sveltestore";
import {Query} from "@data/type-declarations/queryTypes";
import {Plan} from "@data/type-declarations/planTypes";

vi.mock('axios')
const dummy = new Plan()

describe('computePlan', () => {
    /* TODO: Test heavily depends on outside function computePlanForQuery
     * As mentioned below, it heavily depends on axios. Most of its effects are visual though
     *
     * CURRENTLY: Manually tested
     */
    test.todo('Happy path', () => {
        let interpolatedQueries = []
        interpolatedQueryStore.subscribe((x) => {
            interpolatedQueries = x
        })
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
        planDatasetStore.subscribe((x) => {
            planDataset = x
        })
        currentPlanStore.subscribe((x) => {
            currentPlan = x
        })

        // Call function
        computePlan()

        // Assertions: Nothing happens
        assert.deepEqual(planDataset, [dummy])
        assert.deepEqual(currentPlan, dummy)
    })
})

// TODO: Discuss relevance
describe('computePlanForQuery', () => {
    /*
     * TODO: Test heavily depends on axios and a running instance of MOTIS
     *
     * CURRENTLY: Manual testing covers this case
     */
    test.todo('Happy path', () => {
    })

    test('Invalid query', async () => {
        let x: Query = new Query()

        await expect(computePlanForQuery(x)).rejects.toThrow()
    })
})

// TODO: Discuss relevance
describe('downloadPlans', () => {
    test.todo('downloadPlans: Happy path')

    test.todo('downloadPlans: planDatasetStore is empty')
})
