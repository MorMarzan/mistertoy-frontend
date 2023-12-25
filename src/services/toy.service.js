
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

const STORAGE_KEY = 'toyDB'
const gLabels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle',
    'Outdoor', 'Battery Powered']

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getDefaultFilter,
    gLabels
}

_createToys()

function query(filterBy, sortBy = { type: '', dir: 1 }) {
    // return axios.get(BASE_URL).then(res => res.data)
    // return storageService.query(STORAGE_KEY)
    return storageService.query(STORAGE_KEY)
        .then(toys => {
            if (filterBy.name) {
                const regExp = new RegExp(filterBy.name, 'i')
                toys = toys.filter(toy => regExp.test(toy.name))
            }
            if (filterBy.inStock !== undefined) {
                toys = toys.filter(toy => toy.inStock === filterBy.inStock)
            }
            if (filterBy.maxPrice) {
                toys = toys.filter(toy => toy.price <= filterBy.maxPrice)
            }
            if (filterBy.labels) {
                toys = toys.filter(toy => toy.labels.includes(filterBy.labels))
            }
            // if (filterBy.labels) {
            //     const filterLabelsLowerCase = filterBy.labels.toLowerCase().replace(/\s/g, '');
            //     toys = toys.filter(toy => {
            //         const toyLabelsLowerCase = toy.labels.map(label => label.toLowerCase().replace(/\s/g, ''))
            //         return toyLabelsLowerCase.includes(filterLabelsLowerCase)
            //     })
            // }
            if (sortBy.type === 'price') { //numeric
                toys.sort((b1, b2) => (b1.price - b2.price) * sortBy.dir)
            }
            else if (sortBy.type === 'createdAt') { //numeric
                toys.sort((b1, b2) => (b1.createdAt - b2.createdAt) * sortBy.dir)
            }
            else if (sortBy.type === 'name') { //abc
                toys.sort((b1, b2) => (b1.name.localeCompare(b2.name) * sortBy.dir))
            }

            return toys
        })
}

function getById(toyId) {
    return storageService.get(STORAGE_KEY, toyId)
}

function remove(toyId) {
    // return Promise.reject('Not now!')
    return storageService.remove(STORAGE_KEY, toyId)
}

function save(toy) {
    if (toy._id) {
        return storageService.put(STORAGE_KEY, toy)
    } else {
        return storageService.post(STORAGE_KEY, toy)
    }
}

function getEmptyToy(name = '', price = '') {
    return {
        name,
        price,
        labels: [],
        createdAt: Date.now(),
        inStock: false,
    }
}

function getDefaultFilter() {
    return {
        name: '',
        maxPrice: '',
        labels: '',
        inStock: undefined,
    }
}

function _createToys() {
    let toys = utilService.loadFromStorage(STORAGE_KEY)
    if (!toys || !toys.length) {
        _createDemoToys()
    }
}

function _createDemoToys() {
    const toyNames = [
        'Teddy Bear',
        'LEGO Set',
        'Dollhouse',
        'Action Figures',
        'Board Game',
        'Remote Control Car',
        'Puzzle',
        'Play-Doh Set',
        'Stuffed Animal',
        'Building Blocks',
        'Art Supplies',
        'Soccer Ball',
        'Toy Kitchen Set',
        'Robot Toy',
        'Barbie Doll',
        'Train Set',
        'Hot Wheels Cars',
        'Rubik\'s Cube',
        'Yo-Yo',
    ]
    const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle',
        'Outdoor', 'Battery Powered']

    const toys = toyNames.map(toyName => {
        const price = utilService.getRandomIntInclusive(1, 800)
        const toy = _createToy(toyName, price)
        toy.inStock = Math.random() < 0.5 ? false : true
        toy.labels.push(labels[utilService.getRandomIntInclusive(0, labels.length - 1)])
        toy.createdAt += utilService.randomPeriodOfTime()
        return toy
    })
    utilService.saveToStorage(STORAGE_KEY, toys)

}

function _createToy(name, price) {
    const toy = getEmptyToy(name, price)
    toy._id = utilService.makeId()
    return toy
}

// TEST DATA
// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 6', price: 980}).then(x => console.log(x))


