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

    function handleLabels({ target }) {
        let value = target.value

        if (value === '') {
            // Handle the case when "No Label" is selected
            setToyToEdit((prevToy) => ({ ...prevToy, labels: [] }))
        } else {
            // Toggle the label in and out of the array
            setToyToEdit((prevToy) => {
                const updatedLabels = prevToy.labels.includes(value)
                    ? prevToy.labels.filter((label) => label !== value)
                    : [...prevToy.labels, value];

                return { ...prevToy, labels: updatedLabels }
            })
        }
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

    const { name, inStock, price, labels } = toyToEdit

    return (
        <section className="toy-edit">
            <h1>{toyId ? 'Edit' : 'Add'} Toy</h1>
            <form onSubmit={onSaveToy}>
                <label htmlFor="name">Name</label>
                <input onChange={handleChange} value={name} type="text" name="name" id="name" />

                <label htmlFor="price">Price</label>
                <input onChange={handleChange} value={price || ''} type="number" name="price" id="price" />

                <div>
                    <input onChange={handleChange} checked={inStock} type="checkbox" name="inStock" id="inStock" />
                    <label htmlFor="inStock">in stock?</label>
                </div>

                <label htmlFor="labels">Label:</label>
                <select name="labels" id="labels" onChange={handleLabels} value={labels || []} multiple>
                    <option value="">No Label</option>
                    {toyService.gLabels.map((label) => (
                        <option key={label} value={label}>
                            {label}
                        </option>
                    ))}
                </select>

                <button className="btn" disabled={!name || !price}>Save</button>
            </form>
            <Link className="btn" to={'/toy'}>← Go back</Link>

        </section>
    )
}