export const utilService = {
    makeId,
    makeLorem,
    getRandomIntInclusive,
    loadFromStorage,
    saveToStorage,
    animateCSS,
    debounce,
    formatTimestamp,
    randomPeriodOfTime,
    objectIdToDate,
    capitalizeFirstLetter
}

function makeId(length = 6) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return txt
}

function makeLorem(size = 100) {
    var words = ['The sky', 'above', 'the port', 'was', 'the color of television', 'tuned', 'to', 'a dead channel', '.', 'All', 'this happened', 'more or less', '.', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', '.', 'It', 'was', 'a pleasure', 'to', 'burn']
    var txt = ''
    while (size > 0) {
        size--
        txt += words[Math.floor(Math.random() * words.length)] + ' '
    }
    return txt
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive 
}

function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

function loadFromStorage(key) {
    const data = localStorage.getItem(key)
    return (data) ? JSON.parse(data) : undefined
}

// In our utilService
function animateCSS(el, animation) {
    const prefix = 'animate__'
    return new Promise((resolve, reject) => {
        const animationName = `${prefix}${animation}`

        el.classList.add(`${prefix}animated`, animationName)

        // When the animation ends, we clean the classes and resolve the Promise
        function handleAnimationEnd(event) {
            event.stopPropagation()
            el.classList.remove(`${prefix}animated`, animationName)
            resolve('Animation ended')
        }
        el.addEventListener('animationend', handleAnimationEnd, { once: true })
    })
}

function debounce(fn, wait) {
    let timer
    return function (...args) {
        if (timer) {
            clearTimeout(timer) // clear any pre-existing timer
        }
        const context = this // get the current context
        timer = setTimeout(() => {
            fn.apply(context, args) // call the function if time expires
        }, wait)
    }
}


function formatTimestamp(timestamp) {
    const now = new Date()
    const date = new Date(timestamp)

    // Check if the date is today
    if (
        date.getDate() === now.getDate() &&
        date.getMonth() === now.getMonth() &&
        date.getFullYear() === now.getFullYear()
    ) {
        // Check if it is in the last 24 hours
        const diffInMinutes = Math.floor((now - date) / (1000 * 60))
        if (diffInMinutes < 1) {
            return 'Now'
        } else if (diffInMinutes < 60) {
            const pluralS = diffInMinutes > 1 ? 's' : ''
            return `${diffInMinutes} minute${pluralS} ago`
        } else if (diffInMinutes < 60 * 24) {
            const diffInHours = Math.floor(diffInMinutes / 60)
            if (diffInHours === 1) {
                return '1 hour ago'
            } else if (diffInHours < 10) {
                return `${diffInHours} hours ago`
            }

            const hours = date.getHours().toString().padStart(2, '0')
            const minutes = date.getMinutes().toString().padStart(2, '0')
            return `today ${hours}:${minutes}`
        }
        return 'today'
    }

    // Check if it is in the same year
    if (date.getFullYear() === now.getFullYear()) {
        const month = date.toLocaleString('default', { month: 'short' })
        const day = date.getDate()
        return `${month} ${day}`
    }

    // If it was more than a year ago, display the year only
    const year = date.getFullYear().toString()
    return year
}

function randomPeriodOfTime() {
    // Define possible time ranges in milliseconds
    const minute = 60 * 1000;
    const hour = 60 * minute;
    const day = 24 * hour;
    const week = 7 * day;
    const month = 30 * day;
    const year = 365 * day;

    // Choose a random time range
    const randomTimeRange = Math.floor(Math.random() * (2 * year - minute) + minute) - year;

    return randomTimeRange; // Return the random time range
}

function objectIdToDate(objectId) {
    const timestamp = parseInt(objectId.substring(0, 8), 16);
    return new Date(timestamp * 1000); // Convert to milliseconds
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}