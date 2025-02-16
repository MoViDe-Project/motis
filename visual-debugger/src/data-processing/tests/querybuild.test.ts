import { vi , expect, test, describe } from 'vitest'
import { buildQueryDataset, computeQueryAttributes } from "@data/queryBuild";
import axios from 'axios';
import { build } from '$service-worker';

vi.mock('axios')

describe('buildQueryDataset', () => {
    test('Happy path', () => {
    })

    test('Empty query batch', () => {
        expect(buildQueryDataset("")).toThrowError()
    })

    test('Invalid query batch', () => {
        expect(buildQueryDataset("Invalid")).toThrow()
    })
})
