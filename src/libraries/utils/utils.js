import React from 'react';
import { Platform, Alert, ToastAndroid, Keyboard, Linking } from 'react-native';
import R from 'res/R';

function hideKeyboard() {
    Keyboard.dismiss()
}

function openStore(android = 'https://google.com', iOS = 'https://google.com') {
    if (Platform.OS === 'ios') {
        Linking.openURL(iOS);
        return;
    }
    Linking.openURL(android);
}

export default {
    hideKeyboard,
    openStore
}



