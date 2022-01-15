import { get, getAll } from '../services/teams'

export const getTeamsById = async ( ids:string|Array<string> ) => {
    return await get( ids )
}

export const getAllTeams = async () => {
    return await getAll()
}