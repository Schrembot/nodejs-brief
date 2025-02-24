import { loadData } from '../utilities/dataCache'

export interface ResultForPlayer {
    /* eslint-disable camelcase */
    player_id: string,
    points_scored: number
    /* eslint-enable camelcase */
}
export interface ResultForTeam {
    /* eslint-disable camelcase */
    team_id: string,
    players: Array<ResultForPlayer>
    /* eslint-enable camelcase */
}
export interface Result {
    /* eslint-disable camelcase */
    home_team: ResultForTeam;
    visiting_team: ResultForTeam;
    /* eslint-enable camelcase */
}
export interface StatsForPlayer {
    /* eslint-disable camelcase */
    points_scored: number
    games_played: number
    /* eslint-enable camelcase */
}
export interface StatsForTeam {
    /* eslint-disable camelcase */
    home_wins: number
    home_losses: number
    home_draws: number
    away_wins: number
    away_losses: number
    away_draws: number
    points_scored: number
    games_played: number
    /* eslint-enable camelcase */
}

export const getAll = async ():Promise<Array<Result>> => {
  return await loadData('results.json')
}

export const getStatsByPlayerId = async (id:string):Promise<StatsForPlayer> => {
  const results = await getAll()

  const stats:StatsForPlayer = {
    /* eslint-disable camelcase */
    games_played: 0,
    points_scored: 0
    /* eslint-enable camelcase */
  }

  results.forEach((game:Result) => {
    // Combine all players in both teams
    game.home_team.players.concat(game.visiting_team.players).forEach((player:ResultForPlayer) => {
      // Pick out the requested player_id and update the stats object
      if (player.player_id === id) {
        stats.games_played++
        stats.points_scored += player.points_scored
      }
    })
  })

  return stats
}

const tallyScoreForPlayers = (players:Array<ResultForPlayer>):number => {
  return players.reduce((prev:number, current:ResultForPlayer) => {
    prev += current.points_scored
    return prev
  }, 0)
}

export const getStatsByTeamId = async (id:string):Promise<StatsForTeam> => {
  const results = await getAll()

  const stats:StatsForTeam = {
    /* eslint-disable camelcase */
    home_wins: 0,
    home_losses: 0,
    home_draws: 0,
    away_wins: 0,
    away_losses: 0,
    away_draws: 0,
    points_scored: 0,
    games_played: 0
    /* eslint-enable camelcase */
  }

  results.forEach((result:Result) => {
    if (result.home_team.team_id === id || result.visiting_team.team_id === id) {
      const homeScore = tallyScoreForPlayers(result.home_team.players)
      const awayScore = tallyScoreForPlayers(result.visiting_team.players)
      const teamIsAtHome = result.home_team.team_id === id

      // We know this is a game which the team has participated in
      stats.games_played++

      if (teamIsAtHome) {
        // We know it's the home team
        stats.points_scored += homeScore

        if (homeScore > awayScore) {
          // We know it's a win
          stats.home_wins++
        } else if (homeScore < awayScore) {
          // We know it's a loss
          stats.home_losses++
        } else {
          // We know it's a draw
          stats.home_draws++
        }
      } else {
        // We know it's the away team
        stats.points_scored += awayScore

        if (awayScore > homeScore) {
          // We know it's a win
          stats.away_wins++
        } else if (awayScore < homeScore) {
          // We know it's a loss
          stats.away_losses++
        } else {
          // We know it's a draw
          stats.away_draws++
        }
      }
    }
  })

  return stats
}
