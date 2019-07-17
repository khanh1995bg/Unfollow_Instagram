import { AsyncStorage } from 'react-native';

const KEY = {
    LAST_TIME_SHOW_RATING_DIALOG: 'LAST_TIME_SHOW_RATING_DIALOG',
    CAN_SHOW_RATING_DIALOG: 'CAN_SHOW_RATING_DIALOG',
    KEY_USER: 'KEY_USER',
    INFO_USER: 'INFO_USER',
    DATA_WHITELIST: 'DATA_WHITELIST',
    UNLOCKED_ALL_FEATURES: 'UNLOCKED_ALL_FEATURES',
    KEY_USER_TOKEN: 'KEY_USER_TOKEN',
    KEY_USER_TEST: 'KEY_USER_TEST',
}

var user = {};
var info_user = {};
var user_test = {};
var data_whitelist = {};
var unlockedAllFeatures = false;
var tokenCache = ''


function save(key, value) {
    AsyncStorage.setItem(key, value);
}

async function get(key) {
    return AsyncStorage.getItem(key);
}

export default {
    save,
    get,
    user,
    info_user,
    data_whitelist,
    KEY,
    unlockedAllFeatures,
    tokenCache,
    user_test,
}