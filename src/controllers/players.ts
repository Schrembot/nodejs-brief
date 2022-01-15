const playersService = require('../services/players')

const getPlayersById = async ( ids:string|Array<string> ) => {
    return await playersService.get( ids )
}

const getAllPlayers = async () => {
    return await playersService.getAll()
}

module.exports = {
    getPlayersById,
    getAllPlayers
}