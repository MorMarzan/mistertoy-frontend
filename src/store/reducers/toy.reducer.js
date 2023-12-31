import { toyService } from "../../services/toy.service.js"

export const SET_TOYS = 'SET_TOYS'
export const REMOVE_TOY = 'REMOVE_TOY'
export const ADD_TOY = 'ADD_TOY'
export const UPDATE_TOY = 'UPDATE_TOY'
export const SET_FILTER_BY = 'SET_FILTER_BY'
export const SET_SORT_BY = 'SET_SORT_BY'
export const UPDATE_MSG = 'UPDATE_MSG'
export const ADD_MSG = 'ADD_MSG'
export const REMOVE_MSG = 'REMOVE_MSG'

export const SET_IS_LOADING = 'SET_IS_LOADING'

const initialState = {
    toys: [],
    isLoading: false,
    filterBy: toyService.getDefaultFilter(),
    sortBy: { type: '', dir: 1 }
}

export function toyReducer(state = initialState, action = {}) {

    let toys
    let updatedMsgs
    switch (action.type) {
        case SET_TOYS:
            return { ...state, toys: action.toys }

        case REMOVE_TOY:
            toys = state.toys.filter(toy => toy._id !== action.toyId)
            return { ...state, toys }

        case ADD_TOY:
            toys = [...state.toys, action.toy]
            return { ...state, toys }

        case UPDATE_TOY:
            toys = state.toys.map(toy => toy._id === action.toy._id ? action.toy : toy)
            return { ...state, toys }

        case SET_FILTER_BY:
            return { ...state, filterBy: { ...state.filterBy, ...action.filterBy } }

        case SET_SORT_BY:
            return { ...state, sortBy: { ...state.sortBy, ...action.sortBy } }

        case ADD_MSG:
            toys = state.toys.map(toy => {
                if (toy._id === action.toyId) {
                    updatedMsgs = toy.msgs ? [...toy.msgs, action.msg] : [action.msg]
                    return { ...toy, msgs: updatedMsgs }
                }
                return toy
            })
            return { ...state, toys }

        case REMOVE_MSG:
            toys = state.toys.map(toy => {
                if (toy._id === action.toyId) {
                    updatedMsgs = toy.msgs.filter(msg => msg.id !== action.msgId)
                    return { ...toy, msgs: updatedMsgs }
                }
                return toy
            })
            return { ...state, toys }


        case SET_IS_LOADING:
            return { ...state, isLoading: action.isLoading }

        default:
            return state
    }
}
