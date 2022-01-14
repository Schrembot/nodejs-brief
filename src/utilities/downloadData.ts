import fs, { ensureDir, pathExists } from 'fs-extra'
import path from 'path'
import axios from 'axios';

export const downloadData = async ( targets:Array<string> ) => {
    
    let cache = path.join(__dirname, '..', 'cache')
    await ensureDir(cache)

    return Promise.all( targets.map( async item => {
        let basename = path.basename(item)
        let filepath = path.join(cache, basename)
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