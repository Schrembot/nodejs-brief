import { validateEnvironment } from '../../../src/utilities/validateEnvironment'


test('Environment variables one missing', () => {

    let invalidEnvironment = () => {
        validateEnvironment({
            LEAGUE_SERVER_PORT: 1234,
            LEAGUE_SOURCE_ROOT_URL: 'http://localhost',
        })
    }

    expect( invalidEnvironment ).toThrow( `Missing Environment Variables: LEAGUE_API_KEY` )
})

test('Environment variables not set', () => {

    let invalidEnvironment = () => {
        validateEnvironment({
        })
    }

    expect( invalidEnvironment ).toThrow( `Missing Environment Variables: LEAGUE_SERVER_PORT,LEAGUE_SOURCE_ROOT_URL,LEAGUE_API_KEY` )
})

test('Environment variables are correctly set', () => {

    let validEnvironment = validateEnvironment({
        LEAGUE_SERVER_PORT: 1234,
        LEAGUE_SOURCE_ROOT_URL: 'http://localhost',
        LEAGUE_API_KEY: '1234-1234-1234'
    })

    expect( validEnvironment ).toBeTruthy()
})

test('Environment variables are correctly set with extras', () => {

    let validEnvironment = validateEnvironment({
        LEAGUE_SERVER_PORT: 1234,
        LEAGUE_SOURCE_ROOT_URL: 'http://localhost',
        LEAGUE_API_KEY: '1234-1234-1234',
        EXTRA_VARIABLE: 'That is okay'
    })

    expect( validEnvironment ).toBeTruthy()
})