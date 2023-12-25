
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

    // function handleMultiSelect(target) {
    //     // const field = target.name
    //     const value = Array.from(target.selectedOptions ?? [], (option) => option.value)
    //     setFilterByToEdit((prevFilter) => ({ ...prevFilter, labels: value }))
    // }

    // console.log('filterByToEdit', filterByToEdit)

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
                <select name="labels" id="labels" onChange={handleChange} defaultValue={labels} >
                    {/* multiple */}
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