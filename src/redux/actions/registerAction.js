import {
    UPDATE_FIRSTNAME,
    UPDATE_LASTNAME,
    UPDATE_PASSWORD,
    UPDATE_EMAIL,
    CLEAR_USER_REGISTER,
    UPDATE_USER_REGISTER,
    WATCH_REGISTER_ACCOUNT
} from "./actionTypes";



export function onUpdateUserRegister(user) {
    return {
        type: UPDATE_USER_REGISTER,
        payload: user
    }
}

export function onRegisterAccount(user) {
    return {
        type: WATCH_REGISTER_ACCOUNT,
        payload: user
    }
}

export function onUpdateFirstName(firstName) {
    return {
        type: UPDATE_FIRSTNAME,
        payload: firstName
    }
}

export function onClearUserRegister() {
    return {
        type: CLEAR_USER_REGISTER,
    }
}

export function onUpdateLastName(lastName) {
    return {
        type: UPDATE_LASTNAME,
        payload: lastName
    }
}

export function onUpdateEmail(email) {
    return {
        type: UPDATE_EMAIL,
        payload: email
    }
}

export function onUpdatePassword(password) {
    return {
        type: UPDATE_PASSWORD,
        payload: password
    }
}




