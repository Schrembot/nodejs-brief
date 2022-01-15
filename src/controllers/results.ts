const resultsService = require('../services/results')

const getAllResults = async () => {
    return await resultsService.getAll()
}

module.exports = {
    getAllResults
}