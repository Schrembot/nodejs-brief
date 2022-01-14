export const validateEnvironment = ( environment:any ):void => {
    let required = [
        'LEAGUE_SERVER_PORT',
        'LEAGUE_SOURCE_ROOT_URL',
        'LEAGUE_API_KEY'
    ];
    let missing = required.filter(item => environment[item] === undefined || environment[item] === '')
    
    if (missing.length) {
        console.log(`Missing Environment Variables: ${missing.join()}`)
        process.exit();
    }
}