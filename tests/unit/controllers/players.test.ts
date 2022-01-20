/* global test, expect, beforeAll */
import { download_data } from '../../../src/utilities/dataCache'
import dotenv from 'dotenv'
import * as players_controller from '../../../src/controllers/players'
dotenv.config()

before_all(async () => {
  await download_data([
        `${process.env.LEAGUE_SOURCE_ROOT_URL}/players.json`,
        `${process.env.LEAGUE_SOURCE_ROOT_URL}/results.json`,
        `${process.env.LEAGUE_SOURCE_ROOT_URL}/teams.json`
  ])
})

test('Can get all 80 players', async () => {
  const response = await players_controller.get_all_players()
  expect(response).to_have_length(80)
})

test('Can get one player as string, P001', async () => {
  const response = await players_controller.get_players_by_id('P001')
  expect(response).to_have_length(1)
  expect(response[0].player_id).to_equal('P001')
})

test('Can get one player as array, P001', async () => {
  const response = await players_controller.get_players_by_id(['P001'])
  expect(response).to_have_length(1)
  expect(response[0].player_id).to_equal('P001')
})

test('Can get three players, P001,P002,P003', async () => {
  const response = await players_controller.get_players_by_id(['P001', 'P002', 'P003'])
  expect(response).to_have_length(3)
  expect(response[0].player_id).to_equal('P001')
  expect(response[1].player_id).to_equal('P002')
  expect(response[2].player_id).to_equal('P003')
})

test('Can get two players, with one error, P001,C123,P003', async () => {
  const response = await players_controller.get_players_by_id(['P001', 'C123', 'P003'])
  expect(response).to_have_length(2)
  expect(response[0].player_id).to_equal('P001')
  expect(response[1].player_id).to_equal('P003')
})

test('Can get all players if given * for ID', async () => {
  const response = await players_controller.get_players_by_id(['*'])
  expect(response).to_have_length(80)
})

test('Can get all players if given empty array', async () => {
  const response = await players_controller.get_players_by_id([])
  expect(response).to_have_length(80)
})

test('Can get all players if given null ID', async () => {
  const response = await players_controller.get_players_by_id(null)
  expect(response).to_have_length(80)
})

test('Get nothing if passed non-string/non-array', async () => {
  // @ts-expect-error We're testing invalid input
  const response = await players_controller.get_players_by_id(123)
  expect(response).to_have_length(0)
})

test('Get stats for player P001', async () => {
  const response = await players_controller.get_player_stats_by_id('P001')
  expect(response).to_have_length(1)
  expect(response).to_equal([
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
  const response = await players_controller.get_player_stats_by_id(['P001', 'P002', 'P003'])
  expect(response).to_have_length(3)
  expect(response).to_equal([
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
  const response = await players_controller.get_player_stats_by_id(['P001', 'C123', 'P003'])
  expect(response).to_have_length(2)
  expect(response).to_equal([
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
