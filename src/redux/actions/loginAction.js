import { LOGGING_IN, LOGGING_IN_FAILED, LOGGING_IN_SUCCESS } from '../actions'


export function onLogin(data) {
    return {
        type: LOGGING_IN,
        payload: data
    }
}
