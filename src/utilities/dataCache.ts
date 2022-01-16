import fs, { ensureDir, pathExists } from 'fs-extra'
import path from 'path'
import axios from 'axios'

const cache:{[key:string]:any;} = {};

export const getCacheLocation = () => {
    return path.join(__dirname, '..', 'cache')
}
export const getCacheFileLocation = ( file:string ) => {
    return `${path.join(getCacheLocation(), file)}`
}

export const downloadData = async ( targets:Array<string> ) => {
    
    await ensureDir( getCacheLocation() )

    return Promise.all( targets.map( async item => {
        let basename = path.basename(item)
        let filepath = getCacheFileLocation(basename)
        let file_exists = await pathExists(filepath)

        if ( !file_exists ) {
            let response = await axios.get(item);
            await fs.writeFile( filepath, JSON.stringify(response.data, null, 4) )
            cache[ basename ] = response.data
            return
        } 
        await loadData(basename)
    }))
}

export const loadData = async (file:string) => {
    if ( !cache[ file ] ) {
        let data = await fs.readJSON(getCacheFileLocation(file))
        cache[ file ] = data
    }
    return cache[ file ]
}

export const getCacheKeys = ():Array<string> => {
    return Object.keys(cache)
}