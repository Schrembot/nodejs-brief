import { loadData } from "../utilities/dataCache";

export interface Result {
    home_team: {
        team_id: string,
        players: Array<{player_id: string, points_scored: number}>
    };
    visiting_team: {
        team_id: string,
        players: Array<{player_id: string, points_scored: number}>
    };
}

const getAll = async () => {
    return await loadData('results.json')
}

module.exports = {
    getAll
}