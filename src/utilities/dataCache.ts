import fs, { ensureDir, pathExists } from 'fs-extra'
import path from 'path'
import axios from 'axios'

const cache:{[key:string]:any;} = {};

const getCacheLocation = () => {
    return path.join(__dirname, '..', 'cache')
}
const getCacheFileLocation = ( file:string ) => {
    return `${path.join(getCacheLocation(), file)}`
}

export const downloadData = async ( targets:Array<string> ) => {
    
    await ensureDir( getCacheLocation() )

    return Promise.all( targets.map( async item => {
        let basename = path.basename(item)
        let filepath = getCacheFileLocation(basename)
        let file_exists = await pathExists(filepath)

        if ( file_exists ) return // This is fine, we've got the file already downloaded
        if ( basename.length === 0 ) throw new Error(`Warning: ${item} has no valid basename`)

        let response = await axios.get(item);
        await fs.writeFile( filepath, JSON.stringify(response.data, null, 4) )
        cache[ basename ] = response.data

        console.log(`✓ ${item} (${response.data.length} items)`)
    }))
}

export const loadData = async (file:string) => {
    if ( !cache[ file ] ) {
        let data = await fs.readJSON(getCacheFileLocation(file))
        cache[ file ] = data
    }
    return cache[ file ]
}

export const passthroughData = (file:string) => {
    return getCacheFileLocation(file)
}