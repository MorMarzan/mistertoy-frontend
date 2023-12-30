import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import { loadToy } from '../store/actions/toy.actions.js'
import { utilService } from '../services/util.service.js'

export function ToyDetails() {

    const [toy, setToy] = useState(null)
    const { toyId } = useParams()

    useEffect(() => {
        _loadToy()
    }, [toyId])

    async function _loadToy() {
        try {
            const loadedToy = await loadToy(toyId)
            setToy(loadedToy)
        } catch (err) {
            console.error('Error loading toy:', err)
        }
    }

    if (!toy) return <div>Loading...</div>

    const { name, price, inStock, _id, labels } = toy //replace createdAt with _id so it'll work with mongo's id
    const createdAt = utilService.objectIdToDate(_id)


    return (
        <section className="toy-details">
            <h2>Toy Details</h2>
            <h3>Toy: {utilService.capitalizeFirstLetter(name)}</h3>
            <h3>Price: {price}$</h3>
            <h3>In stock? {inStock ? 'yes' : 'no'}</h3>
            <h3>Created: {utilService.formatTimestamp(createdAt)}</h3>
            <h3>Labels: {labels.join(', ')}</h3>
            <Link className="btn" to={'/toy'}>← Go back</Link>
        </section>
    )
}