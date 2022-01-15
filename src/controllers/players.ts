const playersService = require('../services/players')

const getById = async ( ids:string|Array<string> ) => {
    return await playersService.get( ids )
}

const getAll = async () => {
    return await playersService.getAll()
}

module.exports = {
    getById,
    getAll
}