/* global test, expect, beforeAll */
import { downloadData } from '../../../src/utilities/dataCache'
import dotenv from 'dotenv'
import * as playersController from '../../../src/controllers/players'
dotenv.config()

beforeAll(async () => {
  await downloadData([
        `${process.env.LEAGUE_SOURCE_ROOT_URL}/players.json`,
        `${process.env.LEAGUE_SOURCE_ROOT_URL}/results.json`,
        `${process.env.LEAGUE_SOURCE_ROOT_URL}/teams.json`
  ])
})

test('Can get all 80 players', async () => {
  const response = await playersController.getAllPlayers()
  expect(response).toHaveLength(80)
})

test('Can get one player as string, P001', async () => {
  const response = await playersController.getPlayersById('P001')
  expect(response).toHaveLength(1)
  expect(response[0].player_id).toEqual('P001')
})

test('Can get one player as array, P001', async () => {
  const response = await playersController.getPlayersById(['P001'])
  expect(response).toHaveLength(1)
  expect(response[0].player_id).toEqual('P001')
})

test('Can get three players, P001,P002,P003', async () => {
  const response = await playersController.getPlayersById(['P001', 'P002', 'P003'])
  expect(response).toHaveLength(3)
  expect(response[0].player_id).toEqual('P001')
  expect(response[1].player_id).toEqual('P002')
  expect(response[2].player_id).toEqual('P003')
})

test('Can get two players, with one error, P001,C123,P003', async () => {
  const response = await playersController.getPlayersById(['P001', 'C123', 'P003'])
  expect(response).toHaveLength(2)
  expect(response[0].player_id).toEqual('P001')
  expect(response[1].player_id).toEqual('P003')
})

test('Can get all players if given * for ID', async () => {
  const response = await playersController.getPlayersById(['*'])
  expect(response).toHaveLength(80)
})

test('Can get all players if given empty array', async () => {
  const response = await playersController.getPlayersById([])
  expect(response).toHaveLength(80)
})

test('Can get all players if given null ID', async () => {
  const response = await playersController.getPlayersById(null)
  expect(response).toHaveLength(80)
})

test('Get nothing if passed non-string/non-array', async () => {
  // @ts-expect-error We're testing invalid input
  const response = await playersController.getPlayersById(123)
  expect(response).toHaveLength(0)
})

test('Get stats for player P001', async () => {
  const response = await playersController.getPlayerStatsById('P001')
  expect(response).toHaveLength(1)
  expect(response).toEqual([
    {
      player_id: 'P001',
      name: 'Stephen Radcliffe',
      age: 40,
      team_id: 'mimu',
      team_name: 'The Mighty Mustangs',
      games_played: 11,
      points_scored: 3
    }
  ])
})

test('Get stats for player P001,P002,P003', async () => {
  const response = await playersController.getPlayerStatsById(['P001', 'P002', 'P003'])
  expect(response).toHaveLength(3)
  expect(response).toEqual([
    {
      player_id: 'P001',
      name: 'Stephen Radcliffe',
      age: 40,
      team_id: 'mimu',
      team_name: 'The Mighty Mustangs',
      games_played: 11,
      points_scored: 3
    },
    {
      player_id: 'P002',
      name: 'Bob Gaga',
      age: 21,
      team_id: 'chbu',
      team_name: 'Charging Buffalos',
      games_played: 10,
      points_scored: 11
    },
    {
      player_id: 'P003',
      name: 'Stephen Martin',
      age: 35,
      team_id: 'chbu',
      team_name: 'Charging Buffalos',
      games_played: 13,
      points_scored: 8
    }
  ])
})

test('Get stats for player P001,C123,P003', async () => {
  const response = await playersController.getPlayerStatsById(['P001', 'C123', 'P003'])
  expect(response).toHaveLength(2)
  expect(response).toEqual([
    {
      player_id: 'P001',
      name: 'Stephen Radcliffe',
      age: 40,
      team_id: 'mimu',
      team_name: 'The Mighty Mustangs',
      games_played: 11,
      points_scored: 3
    },
    {
      player_id: 'P003',
      name: 'Stephen Martin',
      age: 35,
      team_id: 'chbu',
      team_name: 'Charging Buffalos',
      games_played: 13,
      points_scored: 8
    }
  ])
})
