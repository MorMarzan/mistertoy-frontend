import { useEffect, useState } from "react"


export function ToySort({ onSetSortBy, sortBy }) {

    const [sortByToEdit, setSortByToEdit] = useState({ ...sortBy })

    useEffect(() => {
        onSetSortBy(sortByToEdit)
    }, [sortByToEdit])

    function handleChange({ target }) {
        const field = target.name
        const value = target.type === 'number' ? +target.value : target.value
        console.log('field:', field)
        console.log('value:', value)
        if (field === 'dir')
            setSortByToEdit(prevSort => ({
                ...prevSort,
                dir: -prevSort.dir,
            }))
        else
            setSortByToEdit(prevSort => ({
                ...prevSort,
                [field]: value,
            }))
    }

    return (
        <form className="toy-sort">
            <select
                className="sort-type"
                name="type"
                defaultValue={sortByToEdit.type}
                onChange={handleChange}
            >
                {/* <option value={''}>----</option> */}
                <option disabled value="">Choose option</option>
                <option value="createdAt">Date</option>
                <option value="price">Price</option>
                <option value="name">Name</option>
            </select>

            <label>
                <input
                    type="checkbox"
                    name="dir"
                    checked={sortByToEdit.dir < 0}
                    onChange={handleChange}
                    disabled={!sortByToEdit.type}
                />
                Descending
            </label>
        </form>


    )
}
