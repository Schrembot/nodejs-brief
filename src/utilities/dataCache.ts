import fs, { ensure_dir, path_exists } from 'fs-extra'
import path from 'path'
import axios from 'axios'
import { Team } from '../services/teams'
import { Player } from '../services/players'
import { Result } from '../services/results'

const cache:{[key:string]:Array<Team|Player|Result>;} = {}

export const get_cache_location = () => {
  return path.join(__dirname, '..', 'cache')
}
export const get_cache_file_location = (file:string):string => {
  return `${path.join(get_cache_location(), file)}`
}

export const download_data = async (targets:Array<string>):Promise<object> => {
  await ensure_dir(get_cache_location())

  return Promise.all(targets.map(async item => {
    const basename = path.basename(item)
    const filepath = get_cache_file_location(basename)
    const file_exists = await path_exists(filepath)

    if (!file_exists) {
      try {
        const response = await axios.get(item)
        await fs.write_file(filepath, JSON.stringify(response.data, null, 4))
        cache[basename] = response.data
        return
      } catch (error) {
        if (axios.is_axios_error(error)) throw new Error(`Failed to download ${item} (${error.response?.status})`)
        throw error
      }
    }
    await load_data(basename)
  }))
}

// @ts-ignore It's coming from an internal JSON file
export const load_data = async (file:string):Promise<Array<any>> => {
  if (!cache[file]) {
    cache[file] = await fs.read_j_s_o_n(get_cache_file_location(file))
  }
  return cache[file]
}

export const get_cache_keys = ():Array<string> => {
  return Object.keys(cache)
}
