import { userService } from "../../services/user.service.js"

export const SET_USER = 'SET_USER'
export const UPDATE_USER_PREF = 'UPDATE_USER_PREF'
export const SET_USER_SCORE = 'SET_USER_SCORE'

const initialState = {
    loggedinUser: userService.getLoggedinUser(),
}

export function userReducer(state = initialState, action = {}) {
    let user
    switch (action.type) {

        case SET_USER:
            return { ...state, loggedinUser: action.user }

        case UPDATE_USER_PREF:
            user = { ...state.loggedinUser, ...action.userPref }
            return { ...state, loggedinUser: user }
            
        default:
            return state
    }
}
