import { toyService } from "../../services/toy.service.js"
import { ADD_TOY, REMOVE_TOY, SET_TOYS, UPDATE_TOY, SET_FILTER_BY, SET_IS_LOADING, SET_SORT_BY, ADD_MSG, UPDATE_MSG } from "../reducers/toy.reducer.js"
import { store } from "../store.js"

export async function loadToys() {
    // store.dispatch({ type: SET_IS_LOADING, isLoading: true })
    const filterBy = store.getState().toyModule.filterBy
    const sortBy = store.getState().toyModule.sortBy
    try {
        const toys = await toyService.query(filterBy, sortBy)
        store.dispatch({ type: SET_TOYS, toys })
    } catch (err) {
        console.log('toy action -> Cannot load toys', err)
        throw err
    } finally {
        // store.dispatch({ type: SET_IS_LOADING, isLoading: false })
    }
}

export async function loadToy(toyId) {
    try {
        const toy = await toyService.getById(toyId)
        return toy
    } catch (err) {
        console.log('toy action -> Cannot load toys', err)
        throw err
    } finally {
        // store.dispatch({ type: SET_IS_LOADING, isLoading: false })
    }
}

// export async function removeToyOptimistic(toyId) {
//     store.dispatch({ type: REMOVE_TOY, toyId })
//     store.dispatch({ type: SET_IS_LOADING, isLoading: true })
//
//     try {
//         await toyService.remove(toyId)
//     } catch (err) {
//         store.dispatch({ type: TOY_UNDO })
//         console.log('toy action -> Cannot remove toy', err)
//         throw err
//     } finally {
//         store.dispatch({ type: SET_IS_LOADING, isLoading: false })
//     }
// }

export async function removeToy(toyId) {
    // store.dispatch({ type: SET_IS_LOADING, isLoading: true })
    try {
        await toyService.remove(toyId)
        store.dispatch({ type: REMOVE_TOY, toyId })
    } catch (err) {
        console.error('toy action -> Cannot remove toy', err)
        throw err
    } finally {
        // store.dispatch({ type: SET_IS_LOADING, isLoading: false })
    }
}

export async function saveToy(toy) {
    const type = toy._id ? UPDATE_TOY : ADD_TOY
    try {
        const toyToSave = await toyService.save(toy)
        store.dispatch({ type, toy: toyToSave })
        return toyToSave
    } catch (err) {
        console.error('toy action -> Cannot save toy', err)
        throw err
    }
}

export async function saveToyMsg(msg, toyId) {
    const type = msg.id ? UPDATE_MSG : ADD_MSG
    try {
        const msgToSave = await toyService.saveMsg(msg, toyId)
        store.dispatch({ type, msg: msgToSave, toyId: toyId })
        return msgToSave
    } catch (err) {
        console.error('toy action -> Cannot save msg', err)
        throw err
    }
}

export async function removeToyMsg(msgId, toyId) {
    try {
        await toyService.removeMsg(msgId, toyId)
        store.dispatch({ type: REMOVE_TOY, msgId: msgId, toyId: toyId })
    } catch (err) {
        console.error('toy action -> Cannot remove msg', err)
        throw err
    }
}

window.removeToyMsg = removeToyMsg

export function setFilterBy(filterBy) {
    store.dispatch({ type: SET_FILTER_BY, filterBy })
}

export function setSortBy(sortBy) {
    store.dispatch({ type: SET_SORT_BY, sortBy })
}