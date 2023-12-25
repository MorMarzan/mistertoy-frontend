import { userService } from "../../services/user.service.js"
import { SET_USER, UPDATE_USER_PREF } from "../reducers/user.reducer.js"
import { store } from "../store.js"

export function signup(credentials) {
    return userService.signup(credentials)
        .then(user => {
            store.dispatch({ type: SET_USER, user })
            return user
        })
        .catch((err) => {
            console.log('user actions -> Cannot login', err)
            throw err
        })
}

export function login(credentials) {
    return userService.login(credentials)
        .then(user => {
            store.dispatch({ type: SET_USER, user })
            return user
        })
        .catch((err) => {
            console.log('user actions -> Cannot signup', err)
            throw err
        })
}

export function logout() {
    return userService.logout()
        .then(user => {
            store.dispatch({ type: SET_USER, user: null })
            // return user
        })
        .catch((err) => {
            console.log('user actions -> Cannot logout', err)
            throw err
        })
}

export function updateUserPref(updatedUser) {
    return userService.updateUserPref(updatedUser)
        .then(savedUserPref => {
            store.dispatch({ type: UPDATE_USER_PREF, userPref: savedUserPref })
            return savedUserPref
        })
        .catch((err) => {
            console.log('user actions -> Cannot signup', err)
            throw err
        })

}
