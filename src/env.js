import { Platform } from 'react-native';


let NODE_DEV = 'development'

if(__DEV__){
    NODE_DEV = 'development'
} else {
    NODE_DEV = 'production'
}

NODE_DEV = 'production'


const serverURL = {
    'development': 'http://apitest.vinsofts.net',
    'production': 'http://apitest.vinsofts.net',
}

const codePushKey = {
    'development': Platform.OS == 'ios' ? 'ios-key-development' : 'android-key-development',
    'production': Platform.OS == 'ios' ? 'yqBsFVOTLzD5GOmrveSQ_gijzXVa173b241b-839e-44b0-bbfb-649af3a04e7a' : 'android-key-development',
}

const oneSignalKey = {
    'development': 'onesignal-key-development',
    'production': 'onesignal-key-production',
}

const SENTRY_KEY = 'sentry-key-here';

export default env = {
    currentNode: NODE_DEV, 
    serverURL: serverURL[NODE_DEV]+'/api',
    codePushKey: codePushKey[NODE_DEV],
    oneSignalKey: oneSignalKey[NODE_DEV],
    sentryKey: SENTRY_KEY
}