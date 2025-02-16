import { test, expect, vi, describe } from "vitest";
import { computePlan, computePlanForQuery, downloadPlans } from "@data/planParsing";
import axios from "axios"
import { interpolatedQueryStore, planDatasetStore } from "sveltestore";
import { Query } from "@data/type-declarations/queryTypes";
import type { Plan } from "@data/type-declarations/planTypes";

vi.mock('axios')

describe('computePlan', () => {
    test('Happy path')

    test('interpolatedQueryStore is empty')
})

describe('computePlanForQuery', () => {
    test('Happy path')

    test('Empty query')

    test('Invalid query')
})

describe('downloadPlans', () => {
    test('downloadPlans: Happy path')

    test('downloadPlans: planDatasetStore is empty')
})
