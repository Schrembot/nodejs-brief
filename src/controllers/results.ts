import { getAll, Result as iResult } from '../services/results'

export const getAllResults = async ():Promise<Array<iResult>> => {
    return await getAll()
}