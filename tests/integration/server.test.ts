/* global test, expect, jest */
import { setupServer } from '../../src/server'
import * as request from 'supertest'

test('Server tests', async () => {
  console.log = jest.fn()
  let app = await setupServer({
    LEAGUESERVER_PORT: null
  })
  expect(app).toBeNull()
  expect(console.log).toHaveBeenCalledTimes(1)

  app = await setupServer({
    LEAGUESERVER_PORT: 3001
  }, ['missing.json'])
  expect(console.log).toHaveBeenCalledTimes(2)
  expect(app).toBeNull()

  // Set up the server correctly now
  app = await setupServer()
  expect(app).not.toBeNull()

  const server = await app.listen(process.env.LEAGUESERVER_PORT)

  // Walk through each expected route
  const unauthorised = await request(app).get('/')
  expect(unauthorised.statusCode).toEqual(401)

  const authorised = await request(app).get('/').set({ 'x-api-Key': process.env.LEAGUE_API_KEY })
  expect(authorised.statusCode).toEqual(200)

  const forbidden = await request(app).get('/').set({ 'x-api-Key': 'incorrect_api_key' })
  expect(forbidden.statusCode).toEqual(403)

  const notFound = await request(app).get('/bad_url').set({ 'x-api-Key': process.env.LEAGUE_API_KEY })
  expect(notFound.statusCode).toEqual(404)

  // Metrics
  const metricsNoauth = await request(app).get('/metrics')
  expect(metricsNoauth.statusCode).toEqual(200)

  const metricsWithauth = await request(app).get('/metrics').set({ 'x-api-Key': process.env.LEAGUE_API_KEY })
  expect(metricsWithauth.statusCode).toEqual(200)

  // Unused verbs
  const postTest = await request(app).post('/').set({ 'x-api-Key': process.env.LEAGUE_API_KEY })
  expect(postTest.statusCode).toEqual(404)

  const putTest = await request(app).put('/').set({ 'x-api-Key': process.env.LEAGUE_API_KEY })
  expect(putTest.statusCode).toEqual(404)

  const patchTest = await request(app).patch('/').set({ 'x-api-Key': process.env.LEAGUE_API_KEY })
  expect(patchTest.statusCode).toEqual(404)

  const deleteTest = await request(app).delete('/').set({ 'x-api-Key': process.env.LEAGUE_API_KEY })
  expect(deleteTest.statusCode).toEqual(404)

  //
  // Players
  const players = await request(app).get('/players').set({ 'x-api-Key': process.env.LEAGUE_API_KEY })
  expect(players.statusCode).toEqual(200)
  expect(players.body.length).toBeGreaterThan(0)

  const playersStar = await request(app).get('/players/*').set({ 'x-api-Key': process.env.LEAGUE_API_KEY })
  expect(playersStar.statusCode).toEqual(200)
  expect(playersStar.body.length).toBeGreaterThan(0)

  const playersID1 = await request(app).get('/players/P001').set({ 'x-api-Key': process.env.LEAGUE_API_KEY })
  expect(playersID1.statusCode).toEqual(200)
  expect(playersID1.body).toHaveLength(1)
  expect(playersID1.body[0].player_id).toBe('P001')

  const playersID2 = await request(app).get('/players/P001,C123,P003').set({ 'x-api-Key': process.env.LEAGUE_API_KEY })
  expect(playersID2.statusCode).toEqual(200)
  expect(playersID2.body).toHaveLength(2)
  expect(playersID2.body[0].player_id).toBe('P001')
  expect(playersID2.body[1].player_id).toBe('P003')

  const playersID3 = await request(app).get('/players/P001,P002,P003').set({ 'x-api-Key': process.env.LEAGUE_API_KEY })
  expect(playersID3.statusCode).toEqual(200)
  expect(playersID3.body).toHaveLength(3)
  expect(playersID3.body[0].player_id).toBe('P001')
  expect(playersID3.body[1].player_id).toBe('P002')
  expect(playersID3.body[2].player_id).toBe('P003')

  const playersID0 = await request(app).get('/players/C123').set({ 'x-api-Key': process.env.LEAGUE_API_KEY })
  expect(playersID0.statusCode).toEqual(200)
  expect(playersID0.body).toHaveLength(0)

  // Player stats
  const playersStarStats = await request(app).get('/players/*/stats').set({ 'x-api-Key': process.env.LEAGUE_API_KEY })
  expect(playersStarStats.statusCode).toEqual(200)
  expect(playersStarStats.body.length).toBeGreaterThan(0)

  const playersID1Stats = await request(app).get('/players/P001/stats').set({ 'x-api-Key': process.env.LEAGUE_API_KEY })
  expect(playersID1Stats.statusCode).toEqual(200)
  expect(playersID1Stats.body).toHaveLength(1)
  expect(playersID1Stats.body[0].player_id).toBe('P001')

  const playersID2Stats = await request(app).get('/players/P001,C123,P003/stats').set({ 'x-api-Key': process.env.LEAGUE_API_KEY })
  expect(playersID2Stats.statusCode).toEqual(200)
  expect(playersID2Stats.body).toHaveLength(2)
  expect(playersID2Stats.body[0].player_id).toBe('P001')
  expect(playersID2Stats.body[1].player_id).toBe('P003')

  const playersID3Stats = await request(app).get('/players/P001,P002,P003/stats').set({ 'x-api-Key': process.env.LEAGUE_API_KEY })
  expect(playersID3Stats.statusCode).toEqual(200)
  expect(playersID3Stats.body).toHaveLength(3)
  expect(playersID3Stats.body[0].player_id).toBe('P001')
  expect(playersID3Stats.body[1].player_id).toBe('P002')
  expect(playersID3Stats.body[2].player_id).toBe('P003')

  const playersID0Stats = await request(app).get('/players/C123/stats').set({ 'x-api-Key': process.env.LEAGUE_API_KEY })
  expect(playersID0Stats.statusCode).toEqual(200)
  expect(playersID0Stats.body).toHaveLength(0)

  //
  // Teams
  const teams = await request(app).get('/teams').set({ 'x-api-Key': process.env.LEAGUE_API_KEY })
  expect(teams.statusCode).toEqual(200)
  expect(teams.body).toHaveLength(10)

  const teamsStar = await request(app).get('/teams/*').set({ 'x-api-Key': process.env.LEAGUE_API_KEY })
  expect(teamsStar.statusCode).toEqual(200)
  expect(teamsStar.body.length).toBeGreaterThan(0)

  const teamsID1 = await request(app).get('/teams/eade').set({ 'x-api-Key': process.env.LEAGUE_API_KEY })
  expect(teamsID1.statusCode).toEqual(200)
  expect(teamsID1.body).toHaveLength(1)
  expect(teamsID1.body[0].team_id).toBe('eade')

  const teamsID2 = await request(app).get('/teams/eade,xyz,thsc').set({ 'x-api-Key': process.env.LEAGUE_API_KEY })
  expect(teamsID2.statusCode).toEqual(200)
  expect(teamsID2.body).toHaveLength(2)
  expect(teamsID2.body[0].team_id).toBe('eade')
  expect(teamsID2.body[1].team_id).toBe('thsc')

  const teamsID3 = await request(app).get('/teams/eade,thti,thsc').set({ 'x-api-Key': process.env.LEAGUE_API_KEY })
  expect(teamsID3.statusCode).toEqual(200)
  expect(teamsID3.body).toHaveLength(3)
  expect(teamsID3.body[0].team_id).toBe('eade')
  expect(teamsID3.body[1].team_id).toBe('thti')
  expect(teamsID3.body[2].team_id).toBe('thsc')

  const teamsID0 = await request(app).get('/teams/xyz').set({ 'x-api-Key': process.env.LEAGUE_API_KEY })
  expect(teamsID0.statusCode).toEqual(200)
  expect(teamsID0.body).toHaveLength(0)

  // Team stats
  const teamsStarStats = await request(app).get('/teams/*/stats').set({ 'x-api-Key': process.env.LEAGUE_API_KEY })
  expect(teamsStarStats.statusCode).toEqual(200)
  expect(teamsStarStats.body.length).toBeGreaterThan(0)

  const teamsID1Stats = await request(app).get('/teams/eade/stats').set({ 'x-api-Key': process.env.LEAGUE_API_KEY })
  expect(teamsID1Stats.statusCode).toEqual(200)
  expect(teamsID1Stats.body).toHaveLength(1)
  expect(teamsID1Stats.body[0].team_id).toBe('eade')

  const teamsID2Stats = await request(app).get('/teams/eade,xyz,thsc/stats').set({ 'x-api-Key': process.env.LEAGUE_API_KEY })
  expect(teamsID2Stats.statusCode).toEqual(200)
  expect(teamsID2Stats.body).toHaveLength(2)
  expect(teamsID2Stats.body[0].team_id).toBe('eade')
  expect(teamsID2Stats.body[1].team_id).toBe('thsc')

  const teamsID3Stats = await request(app).get('/teams/eade,thti,thsc/stats').set({ 'x-api-Key': process.env.LEAGUE_API_KEY })
  expect(teamsID3Stats.statusCode).toEqual(200)
  expect(teamsID3Stats.body).toHaveLength(3)
  expect(teamsID3Stats.body[0].team_id).toBe('eade')
  expect(teamsID3Stats.body[1].team_id).toBe('thti')
  expect(teamsID3Stats.body[2].team_id).toBe('thsc')

  const teamsID0Stats = await request(app).get('/teams/xyz/stats').set({ 'x-api-Key': process.env.LEAGUE_API_KEY })
  expect(teamsID0Stats.statusCode).toEqual(200)
  expect(teamsID0Stats.body).toHaveLength(0)

  //
  // Results
  const results = await request(app).get('/results').set({ 'x-api-Key': process.env.LEAGUE_API_KEY })
  expect(results.statusCode).toEqual(200)
  expect(results.body.length).toBeGreaterThan(0)

  server.close()
})
