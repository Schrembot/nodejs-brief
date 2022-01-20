/* global test, expect, beforeAll */
import { downloadData } from '../../../src/utilities/dataCache'
import dotenv from 'dotenv'
import * as resultsController from '../../../src/controllers/results'
dotenv.config()

beforeAll(async () => {
  await downloadData([
        `${process.env.LEAGUE_SOURCE_ROOT_URL}/results.json`
  ])
})

test('Can get all 90 results', async () => {
  const response = await resultsController.getAllResults()
  expect(response).toHaveLength(90)
})
