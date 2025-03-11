import { vi , expect, test, describe } from 'vitest'
import { buildQueryDataset} from "@data/queryBuild";
import axios from 'axios';
import { interpolatedQueryStore } from 'sveltestore';
import { Batch, Query } from '@data/type-declarations/queryTypes';
import queryJson from '../../../assets/Query-Batch.json';
vi.mock('axios')

describe('buildQueryDataset', () => {
    test('Happy path', () => {
        let interpolatedQuery: Query[] = []

        // TODO: Plain import of JSON file does not work as expected
        // let test: Batch = JSON.parse(queryJson)

        interpolatedQueryStore.subscribe((x) => { interpolatedQuery = x })

        // TODO: Function call
        // buildQueryDataset(test)
        
        // TODO: Include Assertions about changed queries
    })

    test('Empty query batch', () => {
        expect(buildQueryDataset("")).toThrowError()
    })

    test('Invalid query batch', () => {
        expect(buildQueryDataset("Invalid")).toThrow()
    })
})
