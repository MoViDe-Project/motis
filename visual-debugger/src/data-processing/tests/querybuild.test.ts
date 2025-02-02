import { vi , expect, test } from 'vitest'
import { buildQueryDataset } from "../queryBuild";
import { Query } from '../parsing-types/queryInterpolationTypes';
import { writable } from 'svelte/store';

// const mockQueryStore = vi.hoisted(() => writable<Query[]>)

// vi.mock('../querybuild.test.ts', () => ({
//     interpolatedQueryStore: mockQueryStore
// }))

test('buildQueryDataset: Happy path', () => {
})

test('buildQueryDataset: Invalid query batch', () => {

})

test('buildQueryDataset: Empty query batch', () => {
})
