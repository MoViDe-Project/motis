import { test, expect, vi } from "vitest";
import { computePlan, computePlanForQuery, downloadPlans } from "@data/planParsing";
import axios from "axios"
import { planDatasetStore } from "sveltestore";

vi.mock('axios')

test('computePlan: Happy path', () => {
})

test('computePlan: interpolatedQueryStore is empty', () => {
})

test('computePlanForQuery: Happy path')

test('computePlanForQuery: Empty query')

test('computePlanForQuery: Invalid query')

test('downloadPlans: Happy path')

test('downloadPlans: planDatasetStore is empty')

