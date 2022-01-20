export const validateEnvironment = (environment:{[key:string]:string|number|null|undefined}):boolean => {
  const required = [
    'LEAGUE_SERVER_PORT',
    'LEAGUE_SOURCE_ROOT_URL',
    'LEAGUE_API_KEY'
  ]
  const missing = required.filter(item => environment[item] === undefined || environment[item] === null || environment[item] === '')

  if (missing.length) {
    throw new Error(`Missing Environment Variables: ${missing.join()}`)
  }

  return true
}
