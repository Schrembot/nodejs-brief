import { downloadData } from "../../../src/utilities/dataCache"
const teamsController = require('../../../src/controllers/teams')
import dotenv from 'dotenv';
dotenv.config();

beforeAll( async () => {
    await downloadData([
        `${process.env.LEAGUE_SOURCE_ROOT_URL}/players.json`,
        `${process.env.LEAGUE_SOURCE_ROOT_URL}/results.json`,
        `${process.env.LEAGUE_SOURCE_ROOT_URL}/teams.json`,
    ])
})

test('Can get all 10 teams', async () => {
    let response = await teamsController.getAllTeams() 
    expect( response.length ).toEqual( 10 )
})

test('Can get one team as string, eade', async () => {
    let response = await teamsController.getTeamsById('eade')
    expect( response.length ).toEqual( 1 )
    expect( response[0].team_id ).toEqual( 'eade' )
})

test('Can get one team as array, eade', async () => {
    let response = await teamsController.getTeamsById(['eade'])
    expect( response.length ).toEqual( 1 )
    expect( response[0].team_id ).toEqual( 'eade' )
})

test('Can get three teams, eade,thti,thsc', async () => {
    let response = await teamsController.getTeamsById(['eade','thti','thsc']) 
    expect( response.length ).toEqual( 3 )
    expect( response[0].team_id ).toEqual( 'eade' )
    expect( response[1].team_id ).toEqual( 'thti' )
    expect( response[2].team_id ).toEqual( 'thsc' )
})

test('Can get two teams, with one error, eade,xyz,thti', async () => {
    let response = await teamsController.getTeamsById(['eade','xyz','thti']) 
    expect( response.length ).toEqual( 2 )
    expect( response[0].team_id ).toEqual( 'eade' )
    expect( response[1].team_id ).toEqual( 'thti' )
})

test('Can get all teams if given * for ID', async () => {
    let response = await teamsController.getTeamsById(['*']) 
    expect( response.length ).toEqual( 10 )
})

test('Can get all teams if given empty array', async () => {
    let response = await teamsController.getTeamsById([]) 
    expect( response.length ).toEqual( 10 )
})

test('Can get all teams if given null ID', async () => {
    let response = await teamsController.getTeamsById(null) 
    expect( response.length ).toEqual( 10 )
})

test('Get nothing if passed non-string/non-array', async () => {
    let response = await teamsController.getTeamsById(123) 
    expect( response.length ).toEqual( 0 )
})