import { loadData } from "../utilities/dataCache";

export interface ResultForPlayer {
    player_id: string,
    points_scored: number
}
export interface StatsForPlayer {
    points_scored: number
    games_played: number
}
export interface Result {
    home_team: {
        team_id: string,
        players: Array<ResultForPlayer>
    };
    visiting_team: {
        team_id: string,
        players: Array<ResultForPlayer>
    };
}

export const getAll = async () => {
    return await loadData('results.json')
}

export const getStatsByPlayerId = async ( id:string ) => {
    let results = await getAll()
    
    let stats:StatsForPlayer = {
        games_played: 0,
        points_scored: 0
    }

    results.forEach( (game:Result) => {
        // Combine all players in both teams
        game.home_team.players.concat(game.visiting_team.players).forEach( (player:ResultForPlayer)=>{
            // Pick out the requested player_id and update the stats object
            if ( player.player_id === id ) {
                stats.games_played++
                stats.points_scored += player.points_scored
            }
        })
    });

    return stats
}