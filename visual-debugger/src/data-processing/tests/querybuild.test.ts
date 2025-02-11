import { vi , expect, test } from 'vitest'
import { buildQueryDataset } from "@data/queryBuild";

test('buildQueryDataset: Happy path', () => {
})

test('buildQueryDataset: Empty query batch', () => {
    expect(buildQueryDataset("")).toThrowError()
})

test('buildQueryDataset: Invalid query batch', () => {
})

test('computeLocation: Happy path')

test('computeLocation: Empty location')

test('computeLocation: Invalid location')
