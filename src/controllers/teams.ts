import { get, getAll, Team as iTeam } from '../services/teams'
import { getStatsByTeamId, StatsForTeam as iStatsForTeam } from '../services/results'

export const getTeamsById = async ( ids:string|Array<string> ) => {
    return await get( ids )
}

export const getAllTeams = async () => {
    return await getAll()
}

export const getTeamStatsById = async ( ids:string|Array<string> ) => {
    // Get all valid players
    let teams:Array<iTeam> = await getTeamsById( ids )

    // For each player
    return await Promise.all( teams.map( (team:iTeam) => {
        return new Promise(async (resolve, reject)=>{
            // Add their stats
            let stats:iStatsForTeam = await getStatsByTeamId(team.team_id)
            // Combine it all and return the new item
            resolve({...team, ...stats})
        })
    }))
}