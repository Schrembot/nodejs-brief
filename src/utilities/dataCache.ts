import fs, { ensureDir, pathExists } from 'fs-extra'
import path from 'path'
import axios from 'axios'


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

        if ( basename.length ) {
            if ( !file_exists) {
                let response = await axios.get(item);
                console.log(`✓ ${item} (${response.data.length} items)`)
                await fs.writeFile( filepath, JSON.stringify(response.data, null, 4) )
                return
            }
            console.log(`✓ ${item}`)
            return
        }
        console.log(`Warning: ${item} has no valid basename`)
        return
    }))
}

export const loadData = async (file:string) => {
    try {
        return await fs.readJSON(getCacheFileLocation(file))
    } catch ( error ) {
        console.log( error )
    }
    return []
}

export const passthroughData = (file:string) => {
    return getCacheFileLocation(file)
}