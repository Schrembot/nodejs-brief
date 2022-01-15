import { loadData } from "../utilities/dataCache";

export interface Team {
    team_id: string;
    name: string;
}

export const get = async ( ids:string|Array<string> ) => {
    let all:Array<Team> = await getAll()
    if ( !ids ) return all;
    
    if ( !Array.isArray(ids) ) ids = [ids]
    
    if ( ids.length === 0 ) return all 
    if ( ids[0] === '*' ) return all
    
    return all.filter( (item:Team) => ids.includes(item.team_id) )
}

export const getAll = async () => {
    return await loadData('teams.json')
}