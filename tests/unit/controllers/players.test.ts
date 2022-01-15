import { downloadData } from "../../../src/utilities/dataCache"
const playersController = require('../../../src/controllers/players')
import dotenv from 'dotenv';
dotenv.config();

beforeAll( async () => {
    await downloadData([
        `${process.env.LEAGUE_SOURCE_ROOT_URL}/teams.json`,
    ])
})

test('Can get all 80 players', async () => {
    let response = await playersController.getAllPlayers() 
    expect( response.length ).toEqual( 80 )
})

test('Can get one player as string, P001', async () => {
    let response = await playersController.getPlayersById('P001')
    expect( response.length ).toEqual( 1 )
    expect( response[0].player_id ).toEqual( 'P001' )
})

test('Can get one player as array, P001', async () => {
    let response = await playersController.getPlayersById(['P001'])
    expect( response.length ).toEqual( 1 )
    expect( response[0].player_id ).toEqual( 'P001' )
})

test('Can get three players, P001,P002,P003', async () => {
    let response = await playersController.getPlayersById(['P001','P002','P003']) 
    expect( response.length ).toEqual( 3 )
    expect( response[0].player_id ).toEqual( 'P001' )
    expect( response[1].player_id ).toEqual( 'P002' )
    expect( response[2].player_id ).toEqual( 'P003' )
})

test('Can get two players, with one error, P001,C123,P003', async () => {
    let response = await playersController.getPlayersById(['P001','C123','P003']) 
    expect( response.length ).toEqual( 2 )
    expect( response[0].player_id ).toEqual( 'P001' )
    expect( response[1].player_id ).toEqual( 'P003' )
})

test('Can get all players if given * for ID', async () => {
    let response = await playersController.getPlayersById(['*']) 
    expect( response.length ).toEqual( 80 )
})

test('Can get all players if given empty array', async () => {
    let response = await playersController.getPlayersById([]) 
    expect( response.length ).toEqual( 80 )
})

test('Can get all players if given null ID', async () => {
    let response = await playersController.getPlayersById(null) 
    expect( response.length ).toEqual( 80 )
})

test('Get nothing if passed non-string/non-array', async () => {
    let response = await playersController.getPlayersById(123) 
    expect( response.length ).toEqual( 0 )
})