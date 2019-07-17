import NavigationService from 'routers/NavigationService';
import { Status } from './status';
import axios from 'axios';
import constants from 'libraries/utils/constants';
import R from 'res/R';
import env from '../../env'
import database from 'libraries/utils/database'

var instance = axios.create({
    baseURL: env.serverURL,
    timeout: constants.SERVER_TIMEOUT,
})

function fetch(url, data, isAuth) {
    let headers = null
    if (isAuth) {
        headers = {
            Authorization: `Bearer ${database.tokenCache}`
        }
    }

    return instance.get(url, {
        params: {
            ...data
        },
        headers: headers
    }).then(response => {
        return response.data
    }).catch(error => {
        return error;
    })
}

export function generateObjToParams(data){
    var str = Object.keys(data).map(function(key) {
        return key + '=' + data[key];
      }).join('&');
      return str
}

function post(url, data, isAuth) {
    let headers = null
    // if (isAuth) {
    //     headers = {
    //         Authorization: `Bearer ${database.tokenCache}`
    //     }
    // }

    return instance.post(url, {...data}, {
        headers
    }).then(response => {

        return response.data
    }).catch(error => {
        return error;
    })
}

export default apis = {
    PATH: {
        // LOGIN: '/login',
        LOGIN: '/m-login',
        REGISTER: '/register',
        FOLLOWING: '/list-following',
        FOLLOWER: '/list-follower',
        LIKE: '/list-liked',
        MEDIA: '/list-media',
        UNFOLLOW: `/unfollow`,
        BLOCK: '/block-user',
        UNLIKE: '/unlike-media',
        DEL_MEDIA: '/del-media',
        // USER_INFO: '/self-info',
        USER_INFO: '/user',
        LIST_BLOCKED: '/blocked-list',
        UN_BLOCKED: '/unblock-user',
        ADD_WHITELIST: 'add-to-white-list',
        REMOVE_WHITELIST: 'remove-from-white-list',
        WHITE_LIST: '/white-list',
        INACTIVE_DAY: '/update-inactive-day',
        LIST_INACTIVE: 'inactive-day-list',
        GHOST_FILTER: 'update-ghost-filter',
        LIST_GHOST_FILTER: '/ghost-filter',
        USER_PAYMENT: '/save-purchase',
        CHECK_USER_PAYMENT: '/check-purchase',
        CHECK_TRANS_EXIST: '/check-trans',
        NON_FOLLOWER: '/non-follower',
        GHOST_USER: '/ghost-users',
        NON_FOLLOWING: '/non-following',
        // INACTIVE_USERS: '/inactive-users',
    },
    fetch,
    post,

}
