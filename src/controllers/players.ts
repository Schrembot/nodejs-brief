import { get, getAll, Player as iPlayer } from '../services/players'
import { getStatsByPlayerId, StatsForPlayer as iStatsForPlayer } from '../services/results'
import { get as getTeamsById, Team as iTeam } from '../services/teams'

interface PlayerStats extends iPlayer, iStatsForPlayer {
    team_name: string
}

export const getPlayersById = async (ids:string|Array<string>):Promise<Array<iPlayer>> => {
  return await get(ids)
}

export const getAllPlayers = async ():Promise<Array<iPlayer>> => {
  return await getAll()
}

export const getPlayerStatsById = async (ids:string|Array<string>):Promise<Array<iStatsForPlayer>> => {
  // Get all valid players
  const players:Array<iPlayer> = await getPlayersById(ids)

  // For each player
  return Promise.all<PlayerStats>(players.map((player:iPlayer) => {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          // Add their team name
          const team:Array<iTeam> = await getTeamsById(player.team_id)
          // Add their stats
          const stats:iStatsForPlayer = await getStatsByPlayerId(player.player_id)
          // Combine it all and return the new item
          resolve({ ...player, team_name: team[0].name, ...stats })
        } catch (err) {
          reject(err)
        }
      })()
    })
  }))
}
