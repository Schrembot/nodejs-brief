import fs from 'fs-extra'
import { downloadData, getCacheKeys, getCacheFileLocation } from '../../../src/utilities/dataCache'

test('Can download and cache a file', async () => {

    let filepath = getCacheFileLocation('robots.txt')
    await fs.remove(filepath)
    await downloadData(['https://google.com/robots.txt'])
    
    let fileExists = await fs.pathExists(filepath)
    expect(fileExists).toBeTruthy()

    let keys = getCacheKeys()
    expect(keys).toContain('robots.txt')

    await fs.remove(filepath)
})