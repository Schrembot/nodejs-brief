import fs, { ensureDir, pathExists } from 'fs-extra'
import path from 'path'
import axios, { AxiosError } from 'axios'

const cache:{[key:string]:any;} = {};

export const getCacheLocation = () => {
    return path.join(__dirname, '..', 'cache')
}
export const getCacheFileLocation = ( file:string ):string => {
    return `${path.join(getCacheLocation(), file)}`
}

export const downloadData = async ( targets:Array<string> ):Promise<any> => {
    
    await ensureDir( getCacheLocation() )

    return Promise.all( targets.map( async item => {
        let basename = path.basename(item)
        let filepath = getCacheFileLocation(basename)
        let file_exists = await pathExists(filepath)

        if ( !file_exists ) {
            try {
                let response = await axios.get(item);
                await fs.writeFile( filepath, JSON.stringify(response.data, null, 4) )
                cache[ basename ] = response.data
                return

            } catch ( error:AxiosError<any>|any ) {
                throw new Error(`Failed to download ${item} (${ error.code ?? error.response?.status})`);
            }
        } 
        await loadData(basename)
    }))
}

export const loadData = async (file:string):Promise<any> => {
    if ( !cache[ file ] ) {
        let data = await fs.readJSON(getCacheFileLocation(file))
        cache[ file ] = data
    }
    return cache[ file ]
}

export const getCacheKeys = ():Array<string> => {
    return Object.keys(cache)
}