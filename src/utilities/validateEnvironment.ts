export const validateEnvironment = ( environment:any ):boolean => {
    let required = [
        'LEAGUE_SERVER_PORT',
        'LEAGUE_SOURCE_ROOT_URL',
        'LEAGUE_API_KEY'
    ];
    let missing = required.filter(item => environment[item] === undefined || environment[item] === null || environment[item] === '')
    
    if (missing.length) {
        throw new Error(`Missing Environment Variables: ${missing.join()}`)
    }
    
    return true
}