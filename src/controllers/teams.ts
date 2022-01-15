const teamsService = require('../services/teams')

const getTeamsById = async ( ids:string|Array<string> ) => {
    return await teamsService.get( ids )
}

const getAllTeams = async () => {
    return await teamsService.getAll()
}

module.exports = {
    getTeamsById,
    getAllTeams
}