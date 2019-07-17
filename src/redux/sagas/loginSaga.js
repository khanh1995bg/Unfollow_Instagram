import { takeLatest, takeEvery, put, call, take} from 'redux-saga/effects'
import { LOGGING_IN, LOGGING_IN_SUCCESS, LOGGING_IN_FAILED } from '../actions';
import NavigationService from 'routers/NavigationService';
import apis from 'libraries/networking/apis';
import Toast from 'react-native-simple-toast';
import R from 'res/R';
import database from 'libraries/utils/database';
import { showLoading, hideLoading } from 'libraries/components/Loading/LoadingModal';

export function* watchLogin() {
    yield takeLatest(LOGGING_IN, onLogin)
}

function* onLogin(data) {
    try {
        showLoading()
        const res = yield apis.post(apis.PATH.LOGIN, data.payload)
        hideLoading()
        if(res.code == 200){
            yield put({
                type: LOGGING_IN_SUCCESS,
                payload: res
            })
            database.user = data;
            database.save(database.KEY.KEY_USER, JSON.stringify(data));

            // Toast.show(R.strings.Login.msg_login_success)
            NavigationService.reset('Main');
        } else {
            yield put({
                type: LOGGING_IN_FAILED,
                payload: error
            })
            Toast.show(R.strings.Login.msg_login_fail)
        }
       
    } catch (error) {
        hideLoading()
        yield put({
            type: LOGGING_IN_FAILED,
            payload: error
        })

        Toast.show(R.strings.Login.msg_login_fail)
       
    }
}