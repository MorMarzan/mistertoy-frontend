import Axios from 'axios'
import { httpService } from './http.service.js'

// for cookies
const axios = Axios.create({
    withCredentials: true
})

const BASE_URL = 'toy/'
const gLabels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle',
    'Outdoor', 'Battery Powered']

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getDefaultFilter,
    gLabels,
    saveMsg
}

function query(filterBy = {}, sortBy = { type: '', dir: 1 }) {
    const filterSortBy = { ...filterBy, ...sortBy }
    return httpService.get(BASE_URL, filterSortBy)
}

function getById(toyId) {
    return httpService.get(BASE_URL + toyId)
}

function remove(toyId) {
    return httpService.delete(BASE_URL + toyId)
}

function save(toy) {
    if (toy._id) {
        return httpService.put(BASE_URL, toy)
    } else {
        return httpService.post(BASE_URL, toy)
    }
}

function saveMsg(msg, toyId) {
    const msgUrl = BASE_URL + toyId + '/msg'
    if (msg.id) {
        return httpService.put(msgUrl + '/msg.id', msg)
    } else {
        return httpService.post(msgUrl, msg)
    }
}

function getEmptyToy(name = '', price = '') {
    return {
        name,
        price,
        labels: [],
        // createdAt: Date.now(),
        inStock: false,
    }
}

function getDefaultFilter() {
    return {
        name: '',
        maxPrice: '',
        labels: [],
        inStock: undefined,
    }
}

