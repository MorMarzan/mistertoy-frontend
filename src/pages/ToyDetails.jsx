import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import { loadToy } from '../store/actions/toy.actions.js'
import { utilService } from '../services/util.service.js'

export function ToyDetails() {

    const [toy, setToy] = useState(null)
    const { toyId } = useParams()

    useEffect(() => {
        loadToy(toyId)
            .then(setToy)
            .catch(err => console.log('err:', err))
    }, [toyId])


    if (!toy) return <div>Loading...</div>

    const { name, price, inStock, createdAt, labels } = toy

    return (
        <section className="toy-details">
            <h2>Toy Details</h2>
            <h3>Toy: {name}</h3>
            <h3>Price: {price}$</h3>
            <h3>In stock? {inStock ? 'yes' : 'no'}</h3>
            <h3>Created: {utilService.formatTimestamp(createdAt)}</h3>
            <h3>Labels: {labels.join(', ')}</h3>
            <Link className="btn" to={'/toy'}>← Go back</Link>
        </section>
    )
}