import {takeLatest} from 'redux-saga/effects'
import { WATCH_REGISTER_ACCOUNT } from '../actions';
import NavigationService from 'routers/NavigationService';

export function* watchRegister(){
    yield takeLatest(WATCH_REGISTER_ACCOUNT, onWatchRegister)
}

/**
 * 
 * @param {} data 
 * 
 */
function* onWatchRegister(data){
    console.log(data.payload, 'Chien')
    NavigationService.navigate('Main')
}