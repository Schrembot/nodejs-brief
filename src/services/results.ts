import { loadData } from "../utilities/dataCache";

export interface ResultForPlayer {
    player_id: string,
    points_scored: number
}
export interface StatsForPlayer {
    points_scored: number
    games_played: number
}
export interface StatsForTeam {
    home_wins: number
    home_losses: number
    home_draws: number
    away_wins: number
    away_losses: number
    away_draws: number
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

const tallyScoreForPlayers = ( players:Array<ResultForPlayer> ) => {
    return players.reduce( (prev:number, current:ResultForPlayer)=> prev += current.points_scored, 0 )
}

export const getStatsByTeamId = async ( id:string ) => {
    let results = await getAll()
    
    let stats:StatsForTeam = {
        home_wins: 0,
        home_losses: 0,
        home_draws: 0,
        away_wins: 0,
        away_losses: 0,
        away_draws: 0,
        points_scored: 0,
        games_played: 0,
    }

    results.forEach( (result:Result) => {
        if ( result.home_team.team_id===id || result.visiting_team.team_id===id ) {
            let homeScore = tallyScoreForPlayers(result.home_team.players)
            let awayScore = tallyScoreForPlayers(result.visiting_team.players)
            let teamIsAtHome = result.home_team.team_id===id

            // We know this is a game which the team has participated in
            stats.games_played++

            if ( teamIsAtHome ) {
                // We know it's the home team
                stats.points_scored += homeScore

                if ( homeScore > awayScore ) {
                    // We know it's a win
                    stats.home_wins++

                } else if ( homeScore < awayScore ) {
                    // We know it's a loss
                    stats.home_losses++

                } else {
                    // We know it's a draw
                    stats.home_draws++
                }

            } else {
                // We know it's the away team
                stats.points_scored += awayScore

                if ( awayScore > homeScore ) {
                    // We know it's a win
                    stats.away_wins++

                } else if ( awayScore < homeScore ) {
                    // We know it's a loss
                    stats.away_losses++

                } else {
                    // We know it's a draw
                    stats.away_draws++
                }

            }
        }
    });

    return stats
}