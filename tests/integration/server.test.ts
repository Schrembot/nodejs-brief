/* global test, expect, jest */
import { setupServer } from '../../src/server'
import * as request from 'supertest'

test('Server tests', async () => {
  console.log = jest.fn()
  let app = await setupServer({
    LEAGUE_SERVER_PORT: null
  })
  expect(app).toBeNull()
  expect(console.log).toHaveBeenCalledTimes(1)

  app = await setupServer({
    LEAGUE_SERVER_PORT: 3001
  }, ['missing.json'])
  expect(console.log).toHaveBeenCalledTimes(2)
  expect(app).toBeNull()

  // Set up the server correctly now
  app = await setupServer()
  expect(app).not.toBeNull()

  const server = await app.listen(process.env.LEAGUE_SERVER_PORT)

  // Walk through each expected route
  const unauthorised = await request(app).get('/')
  expect(unauthorised.statusCode).toEqual(401)

  const authorised = await request(app).get('/').set({ 'x-api-Key': process.env.LEAGUE_API_KEY })
  expect(authorised.statusCode).toEqual(200)

  const forbidden = await request(app).get('/').set({ 'x-api-Key': 'incorrect_api_key' })
  expect(forbidden.statusCode).toEqual(403)

  const not_found = await request(app).get('/bad_url').set({ 'x-api-Key': process.env.LEAGUE_API_KEY })
  expect(not_found.statusCode).toEqual(404)

  // Metrics
  const metrics_noauth = await request(app).get('/metrics')
  expect(metrics_noauth.statusCode).toEqual(200)

  const metrics_withauth = await request(app).get('/metrics').set({ 'x-api-Key': process.env.LEAGUE_API_KEY })
  expect(metrics_withauth.statusCode).toEqual(200)

  // Unused verbs
  const post_test = await request(app).post('/').set({ 'x-api-Key': process.env.LEAGUE_API_KEY })
  expect(post_test.statusCode).toEqual(404)

  const put_test = await request(app).put('/').set({ 'x-api-Key': process.env.LEAGUE_API_KEY })
  expect(put_test.statusCode).toEqual(404)

  const patch_test = await request(app).patch('/').set({ 'x-api-Key': process.env.LEAGUE_API_KEY })
  expect(patch_test.statusCode).toEqual(404)

  const delete_test = await request(app).delete('/').set({ 'x-api-Key': process.env.LEAGUE_API_KEY })
  expect(delete_test.statusCode).toEqual(404)

  //
  // Players
  const players = await request(app).get('/players').set({ 'x-api-Key': process.env.LEAGUE_API_KEY })
  expect(players.statusCode).toEqual(200)
  expect(players.body.length).toBeGreaterThan(0)

  const players_star = await request(app).get('/players/*').set({ 'x-api-Key': process.env.LEAGUE_API_KEY })
  expect(players_star.statusCode).toEqual(200)
  expect(players_star.body.length).toBeGreaterThan(0)

  const players_id_1 = await request(app).get('/players/P001').set({ 'x-api-Key': process.env.LEAGUE_API_KEY })
  expect(players_id_1.statusCode).toEqual(200)
  expect(players_id_1.body).toHaveLength(1)
  expect(players_id_1.body[0].player_id).toBe('P001')

  const players_id_2 = await request(app).get('/players/P001,C123,P003').set({ 'x-api-Key': process.env.LEAGUE_API_KEY })
  expect(players_id_2.statusCode).toEqual(200)
  expect(players_id_2.body).toHaveLength(2)
  expect(players_id_2.body[0].player_id).toBe('P001')
  expect(players_id_2.body[1].player_id).toBe('P003')

  const players_id_3 = await request(app).get('/players/P001,P002,P003').set({ 'x-api-Key': process.env.LEAGUE_API_KEY })
  expect(players_id_3.statusCode).toEqual(200)
  expect(players_id_3.body).toHaveLength(3)
  expect(players_id_3.body[0].player_id).toBe('P001')
  expect(players_id_3.body[1].player_id).toBe('P002')
  expect(players_id_3.body[2].player_id).toBe('P003')

  const players_id_0 = await request(app).get('/players/C123').set({ 'x-api-Key': process.env.LEAGUE_API_KEY })
  expect(players_id_0.statusCode).toEqual(200)
  expect(players_id_0.body).toHaveLength(0)

  // Player stats
  const players_star_stats = await request(app).get('/players/*/stats').set({ 'x-api-Key': process.env.LEAGUE_API_KEY })
  expect(players_star_stats.statusCode).toEqual(200)
  expect(players_star_stats.body.length).toBeGreaterThan(0)

  const players_id_1_stats = await request(app).get('/players/P001/stats').set({ 'x-api-Key': process.env.LEAGUE_API_KEY })
  expect(players_id_1_stats.statusCode).toEqual(200)
  expect(players_id_1_stats.body).toHaveLength(1)
  expect(players_id_1_stats.body[0].player_id).toBe('P001')

  const players_id_2_stats = await request(app).get('/players/P001,C123,P003/stats').set({ 'x-api-Key': process.env.LEAGUE_API_KEY })
  expect(players_id_2_stats.statusCode).toEqual(200)
  expect(players_id_2_stats.body).toHaveLength(2)
  expect(players_id_2_stats.body[0].player_id).toBe('P001')
  expect(players_id_2_stats.body[1].player_id).toBe('P003')

  const players_id_3_stats = await request(app).get('/players/P001,P002,P003/stats').set({ 'x-api-Key': process.env.LEAGUE_API_KEY })
  expect(players_id_3_stats.statusCode).toEqual(200)
  expect(players_id_3_stats.body).toHaveLength(3)
  expect(players_id_3_stats.body[0].player_id).toBe('P001')
  expect(players_id_3_stats.body[1].player_id).toBe('P002')
  expect(players_id_3_stats.body[2].player_id).toBe('P003')

  const players_id_0_stats = await request(app).get('/players/C123/stats').set({ 'x-api-Key': process.env.LEAGUE_API_KEY })
  expect(players_id_0_stats.statusCode).toEqual(200)
  expect(players_id_0_stats.body).toHaveLength(0)

  //
  // Teams
  const teams = await request(app).get('/teams').set({ 'x-api-Key': process.env.LEAGUE_API_KEY })
  expect(teams.statusCode).toEqual(200)
  expect(teams.body).toHaveLength(10)

  const teams_star = await request(app).get('/teams/*').set({ 'x-api-Key': process.env.LEAGUE_API_KEY })
  expect(teams_star.statusCode).toEqual(200)
  expect(teams_star.body.length).toBeGreaterThan(0)

  const teams_id_1 = await request(app).get('/teams/eade').set({ 'x-api-Key': process.env.LEAGUE_API_KEY })
  expect(teams_id_1.statusCode).toEqual(200)
  expect(teams_id_1.body).toHaveLength(1)
  expect(teams_id_1.body[0].team_id).toBe('eade')

  const teams_id_2 = await request(app).get('/teams/eade,xyz,thsc').set({ 'x-api-Key': process.env.LEAGUE_API_KEY })
  expect(teams_id_2.statusCode).toEqual(200)
  expect(teams_id_2.body).toHaveLength(2)
  expect(teams_id_2.body[0].team_id).toBe('eade')
  expect(teams_id_2.body[1].team_id).toBe('thsc')

  const teams_id_3 = await request(app).get('/teams/eade,thti,thsc').set({ 'x-api-Key': process.env.LEAGUE_API_KEY })
  expect(teams_id_3.statusCode).toEqual(200)
  expect(teams_id_3.body).toHaveLength(3)
  expect(teams_id_3.body[0].team_id).toBe('eade')
  expect(teams_id_3.body[1].team_id).toBe('thti')
  expect(teams_id_3.body[2].team_id).toBe('thsc')

  const teams_id_0 = await request(app).get('/teams/xyz').set({ 'x-api-Key': process.env.LEAGUE_API_KEY })
  expect(teams_id_0.statusCode).toEqual(200)
  expect(teams_id_0.body).toHaveLength(0)

  // Team stats
  const teams_star_stats = await request(app).get('/teams/*/stats').set({ 'x-api-Key': process.env.LEAGUE_API_KEY })
  expect(teams_star_stats.statusCode).toEqual(200)
  expect(teams_star_stats.body.length).toBeGreaterThan(0)

  const teams_id_1_stats = await request(app).get('/teams/eade/stats').set({ 'x-api-Key': process.env.LEAGUE_API_KEY })
  expect(teams_id_1_stats.statusCode).toEqual(200)
  expect(teams_id_1_stats.body).toHaveLength(1)
  expect(teams_id_1_stats.body[0].team_id).toBe('eade')

  const teams_id_2_stats = await request(app).get('/teams/eade,xyz,thsc/stats').set({ 'x-api-Key': process.env.LEAGUE_API_KEY })
  expect(teams_id_2_stats.statusCode).toEqual(200)
  expect(teams_id_2_stats.body).toHaveLength(2)
  expect(teams_id_2_stats.body[0].team_id).toBe('eade')
  expect(teams_id_2_stats.body[1].team_id).toBe('thsc')

  const teams_id_3_stats = await request(app).get('/teams/eade,thti,thsc/stats').set({ 'x-api-Key': process.env.LEAGUE_API_KEY })
  expect(teams_id_3_stats.statusCode).toEqual(200)
  expect(teams_id_3_stats.body).toHaveLength(3)
  expect(teams_id_3_stats.body[0].team_id).toBe('eade')
  expect(teams_id_3_stats.body[1].team_id).toBe('thti')
  expect(teams_id_3_stats.body[2].team_id).toBe('thsc')

  const teams_id_0_stats = await request(app).get('/teams/xyz/stats').set({ 'x-api-Key': process.env.LEAGUE_API_KEY })
  expect(teams_id_0_stats.statusCode).toEqual(200)
  expect(teams_id_0_stats.body).toHaveLength(0)

  //
  // Results
  const results = await request(app).get('/results').set({ 'x-api-Key': process.env.LEAGUE_API_KEY })
  expect(results.statusCode).toEqual(200)
  expect(results.body.length).toBeGreaterThan(0)

  server.close()
})
