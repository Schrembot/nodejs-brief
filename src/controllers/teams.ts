import { get, getAll, Team as iTeam } from '../services/teams'
import { getStatsByTeamId, StatsForTeam as iStatsForTeam } from '../services/results'

interface TeamStats extends iTeam, iStatsForTeam {}

export const getTeamsById = async (ids:string|Array<string>):Promise<Array<iTeam>> => {
  return await get(ids)
}

export const getAllTeams = async ():Promise<Array<iTeam>> => {
  return await getAll()
}

export const getTeamStatsByID = async (ids:string|Array<string>):Promise<Array<TeamStats>> => {
  // Get all valid players
  const teams:Array<iTeam> = await getTeamsById(ids)

  // For each player
  return Promise.all<TeamStats>(teams.map((team:iTeam) => {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          // Add their stats
          const stats:iStatsForTeam = await getStatsByTeamId(team.team_id)
          // Combine it all and return the new item
          resolve({ ...team, ...stats })
        } catch (err) {
          reject(err)
        }
      })()
    })
  }))
}
