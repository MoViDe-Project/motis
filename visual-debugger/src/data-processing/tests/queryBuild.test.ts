import { vi , expect, test, describe } from 'vitest'
import { buildQueryDataset} from "@data/queryBuild";
import axios from 'axios';
import { interpolatedQueryStore } from 'sveltestore';
import { Batch, Query } from '@data/type-declarations/queryTypes';

// import queryJson from '../../../assets/Query-Batch.json';

vi.mock('axios')

describe('buildQueryDataset', () => {
    /* The plain import of JSON is not possible, despite docs saying otherwise
     * Without it, a JSON string must be written manually, which is infeasible
     * 
     * CURRENTLY: Manual testing covers this path
     */
    test.todo('Happy path', () => {
        let interpolatedQuery: Query[] = []

        // TODO: Plain import of JSON file does not work as expected
        // let test: Batch = JSON.parse(queryJson)

        interpolatedQueryStore.subscribe((x) => { interpolatedQuery = x })

        // TODO: Function call
        // buildQueryDataset(test)
        
        // TODO: Include Assertions about changed queries
    })

    /* The following two test are skipped due to technical limits and lack of docs
     * To be concrete: Mocking alert is non-trivial as it would require an instantiated object Window
     * This does not exist in unit testing, only in browsers
     * A similiar case is found in ./comparePlans.test.ts
     *
     * CURRENTLY: The manual testing routine covers those cases as a part of UX testing
     */
    test.skip('Empty query batch', () => {
        expect(buildQueryDataset("")).toThrowError()
    })

    test.skip('Invalid query batch', () => {
        expect(buildQueryDataset("Invalid")).toThrow()
    })
})
