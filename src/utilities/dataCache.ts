import fs, { ensureDir, pathExists } from 'fs-extra'
import path from 'path'
import axios from 'axios'
import { Team } from '../services/teams'
import { Player } from '../services/players'
import { Result } from '../services/results'

const cache:{[key:string]:Array<Team|Player|Result>;} = {}

export const getCacheLocation = () => {
  return path.join(__dirname, '..', 'cache')
}
export const getCacheFileLocation = (file:string):string => {
  return `${path.join(getCacheLocation(), file)}`
}

export const downloadData = async (targets:Array<string>):Promise<object> => {
  await ensureDir(getCacheLocation())

  return Promise.all(targets.map(async item => {
    const basename = path.basename(item)
    const filepath = getCacheFileLocation(basename)
    const fileExists = await pathExists(filepath)

    if (!fileExists) {
      try {
        const response = await axios.get(item)
        await fs.writeFile(filepath, JSON.stringify(response.data, null, 4))
        cache[basename] = response.data
        return
      } catch (error) {
        if (axios.isAxiosError(error)) throw new Error(`Failed to download ${item} (${error.response?.status})`)
        throw error
      }
    }
    await loadData(basename)
  }))
}

export const loadData = async (file:string):Promise<Array<any>> => {
  if (!cache[file]) {
    cache[file] = await fs.readJSON(getCacheFileLocation(file))
  }
  return cache[file]
}

export const getCacheKeys = ():Array<string> => {
  return Object.keys(cache)
}
