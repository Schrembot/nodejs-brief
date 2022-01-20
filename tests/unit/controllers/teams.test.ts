/* global test, expect, beforeAll */
import { downloadData } from '../../../src/utilities/dataCache'
import dotenv from 'dotenv'
import * as teamsController from '../../../src/controllers/teams'
dotenv.config()

beforeAll(async () => {
  await downloadData([
        `${process.env.LEAGUE_SOURCE_ROOT_URL}/players.json`,
        `${process.env.LEAGUE_SOURCE_ROOT_URL}/results.json`,
        `${process.env.LEAGUE_SOURCE_ROOT_URL}/teams.json`
  ])
})

test('Can get all 10 teams', async () => {
  const response = await teamsController.getAllTeams()
  expect(response).toHaveLength(10)
})

test('Can get one team as string, eade', async () => {
  const response = await teamsController.getTeamsById('eade')
  expect(response).toHaveLength(1)
  expect(response[0].team_id).toEqual('eade')
})

test('Can get one team as array, eade', async () => {
  const response = await teamsController.getTeamsById(['eade'])
  expect(response).toHaveLength(1)
  expect(response[0].team_id).toEqual('eade')
})

test('Can get three teams, eade,thti,thsc', async () => {
  const response = await teamsController.getTeamsById(['eade', 'thti', 'thsc'])
  expect(response).toHaveLength(3)
  expect(response[0].team_id).toEqual('eade')
  expect(response[1].team_id).toEqual('thti')
  expect(response[2].team_id).toEqual('thsc')
})

test('Can get two teams, with one error, eade,xyz,thti', async () => {
  const response = await teamsController.getTeamsById(['eade', 'xyz', 'thti'])
  expect(response).toHaveLength(2)
  expect(response[0].team_id).toEqual('eade')
  expect(response[1].team_id).toEqual('thti')
})

test('Can get all teams if given * for ID', async () => {
  const response = await teamsController.getTeamsById(['*'])
  expect(response).toHaveLength(10)
})

test('Can get all teams if given empty array', async () => {
  const response = await teamsController.getTeamsById([])
  expect(response).toHaveLength(10)
})

test('Can get all teams if given null ID', async () => {
  const response = await teamsController.getTeamsById(null)
  expect(response).toHaveLength(10)
})

test('Get nothing if passed non-string/non-array', async () => {
  // @ts-expect-error We're testing invalid input
  const response = await teamsController.getTeamsById(123)
  expect(response).toHaveLength(0)
})

test('Can get one team stats as array, eade', async () => {
  const response = await teamsController.getTeamStatsByID(['eade'])
  expect(response).toHaveLength(1)
  expect(response).toEqual([
    {
      team_id: 'eade',
      name: 'Eagles Defenders',
      home_wins: 4,
      home_losses: 4,
      home_draws: 1,
      away_wins: 2,
      away_losses: 6,
      away_draws: 1,
      points_scored: 87,
      games_played: 18
    }
  ])
})

test('Can get three teams stats, eade,thti,thsc', async () => {
  const response = await teamsController.getTeamStatsByID(['eade', 'thti', 'thsc'])
  expect(response).toHaveLength(3)
  expect(response).toEqual([
    {
      team_id: 'eade',
      name: 'Eagles Defenders',
      home_wins: 4,
      home_losses: 4,
      home_draws: 1,
      away_wins: 2,
      away_losses: 6,
      away_draws: 1,
      points_scored: 87,
      games_played: 18
    },
    {
      team_id: 'thti',
      name: 'The Titans',
      home_wins: 5,
      home_losses: 3,
      home_draws: 1,
      away_wins: 2,
      away_losses: 4,
      away_draws: 3,
      points_scored: 81,
      games_played: 18
    },
    {
      team_id: 'thsc',
      name: 'The Scorpions',
      home_wins: 6,
      home_losses: 2,
      home_draws: 1,
      away_wins: 3,
      away_losses: 4,
      away_draws: 2,
      points_scored: 89,
      games_played: 18
    }
  ])
})

test('Can get two teams stats, with one error, eade,xyz,thti', async () => {
  const response = await teamsController.getTeamStatsByID(['eade', 'xyz', 'thti'])
  expect(response).toHaveLength(2)
  expect(response).toEqual([
    {
      team_id: 'eade',
      name: 'Eagles Defenders',
      home_wins: 4,
      home_losses: 4,
      home_draws: 1,
      away_wins: 2,
      away_losses: 6,
      away_draws: 1,
      points_scored: 87,
      games_played: 18
    },
    {
      team_id: 'thti',
      name: 'The Titans',
      home_wins: 5,
      home_losses: 3,
      home_draws: 1,
      away_wins: 2,
      away_losses: 4,
      away_draws: 3,
      points_scored: 81,
      games_played: 18
    }
  ])
})
