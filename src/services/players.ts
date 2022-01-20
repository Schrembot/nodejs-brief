import { loadData } from '../utilities/dataCache'

export interface Player {
    player_id: string;
    name: string;
    age: number;
    team_id: string;
}

export const get = async (ids:string|Array<string>):Promise<Array<Player>> => {
  const all:Array<Player> = await getAll()
  if (!ids) return all

  if (!Array.isArray(ids)) ids = [ids]

  if (ids.length === 0) return all
  if (ids[0] === '*') return all

  return all.filter((item:Player) => ids.includes(item.player_id))
}

export const getAll = async ():Promise<Array<Player>> => {
  return await loadData('players.json')
}
