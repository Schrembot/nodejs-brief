import { downloadData } from "../../../src/utilities/dataCache"
const resultsController = require('../../../src/controllers/results')
import dotenv from 'dotenv';
dotenv.config();

beforeAll( async () => {
    await downloadData([
        `${process.env.LEAGUE_SOURCE_ROOT_URL}/results.json`,
    ])
})

test('Can get all 10 results', async () => {
    let response = await resultsController.getAllResults() 
    expect( response.length ).toEqual( 90 )
})