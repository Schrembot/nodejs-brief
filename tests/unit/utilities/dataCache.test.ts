/* global test, expect */
import fs from 'fs-extra'
import { downloadData, getCacheKeys, getCacheFileLocation } from '../../../src/utilities/dataCache'

test('Can download and cache a file', async () => {
  const filepath = getCacheFileLocation('robots.txt')
  await fs.remove(filepath)
  await downloadData(['https://google.com/robots.txt'])

  const fileExists = await fs.pathExists(filepath)
  expect(fileExists).toBeTruthy()

  const keys = getCacheKeys()
  expect(keys).toContain('robots.txt')

  await fs.remove(filepath)
})

test('Can report an error if file is not downloaded correctly', async () => {
  await expect(downloadData(['http://localhost/missing.txt'])).rejects.toThrow('Failed to download http://localhost/missing.txt (404)')
})
