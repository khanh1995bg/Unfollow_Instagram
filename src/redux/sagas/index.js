import { watchLogin } from  './loginSaga'
import {all, fork} from 'redux-saga/effects';
import { watchRegister } from './registerSaga';

export default function* rootSaga() {
    yield all([
        fork(watchLogin),
        fork(watchRegister),
        
    ])
}