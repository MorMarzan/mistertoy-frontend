import { Link, useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"

import { toyService } from "../services/toy.service.js"
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { saveToy, loadToy } from '../store/actions/toy.actions.js'

export function ToyEdit() {

    const navigate = useNavigate()
    const { toyId } = useParams()
    const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())

    useEffect(() => {
        if (toyId) {
            loadToy(toyId)
                .then(setToyToEdit)
                .catch(err => console.log('err:', err))
        }
    }, [])

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value
                break;

            case 'checkbox':
                value = target.checked
                break

            default:
                break;
        }

        setToyToEdit(prevToy => ({ ...prevToy, [field]: value }))
    }

    function onSaveToy(ev) {
        ev.preventDefault()
        saveToy(toyToEdit)
            .then((savedToy) => {
                showSuccessMsg(`Toy updated successfully ${savedToy.name}`)
                navigate('/toy')
            })
            .catch(err => {
                console.log('Cannot update toy', err)
                showErrorMsg('Cannot update toy')
            })
    }

    const { name, inStock, price } = toyToEdit

    return (
        <section className="toy-edit">
            <h1>{toyId ? 'Edit' : 'Add'} Toy</h1>
            <form onSubmit={onSaveToy}>
                <label htmlFor="name">Name</label>
                <input onChange={handleChange} value={name} type="text" name="name" id="name" />

                <label htmlFor="price">Name</label>
                <input onChange={handleChange} value={price || ''} type="number" name="price" id="price" />

                <label htmlFor="inStock">in stock?</label>
                <input onChange={handleChange} checked={inStock} type="checkbox" name="inStock" id="inStock" />

                <button disabled={!name}>Save</button>
            </form>
            <button><Link className="btn" to={'/toy'}>← Go back</Link></button>

        </section>
    )
}