
import { useEffect, useState } from "react"
import { toyService } from "../services/toy.service"

export function ToyFilter({ filterBy, onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    function onSetFilterBy(ev) {
        ev.preventDefault()
        onSetFilter(filterByToEdit)
    }

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value
                break

            case 'checkbox':
                value = target.checked
                break

            default:
                break
        }

        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    function handleInStockSelect({ target }) {
        let value = target.value
        switch (target.value) {
            case 'true':
                value = true
                break
            case 'false':
                value = false
                break
            default:
                value = undefined
        }

        setFilterByToEdit(prevFilter => ({ ...prevFilter, inStock: value }))
    }


    function handleLabels({ target }) {
        let value = target.value

        if (value === '') {
            setFilterByToEdit((prevToy) => ({ ...prevToy, labels: [] }))
        } else {
            setFilterByToEdit((prevToy) => {
                const updatedLabels = prevToy.labels.includes(value)
                    ? prevToy.labels.filter((label) => label !== value)
                    : [...prevToy.labels, value];

                return { ...prevToy, labels: updatedLabels }
            })
        }
    }

    const { name, inStock, labels, maxPrice } = filterByToEdit

    return (
        <section className="toy-filter">
            <h2>Filter Our Toys</h2>
            <form onSubmit={onSetFilterBy} >

                <label htmlFor="name">Name: </label>
                <input value={name} onChange={handleChange} type="text" id="name" name="name" />

                <label htmlFor="inStock">Stock Status:</label>
                <select name="inStock" id="inStock" onChange={handleInStockSelect} defaultValue={inStock}>
                    <option value='undefined'>All</option>
                    <option value='false'>Out of stock</option>
                    <option value='true'>Avialable</option>
                </select>

                <label htmlFor="maxPrice">Max Price: </label>
                <input value={maxPrice || ''} onChange={handleChange} type="number" id="maxPrice" name="maxPrice" />

                <label htmlFor="labels">Label:</label>
                <select name="labels" id="labels" onChange={handleLabels} value={labels || []} multiple>
                    <option value="">All</option>
                    {toyService.gLabels.map((label) => (
                        <option key={label} value={label}>
                            {label}
                        </option>
                    ))}
                </select>

                <button>Filter</button>
            </form>
        </section>
    )
}