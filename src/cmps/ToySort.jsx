import { Box, Checkbox, MenuItem, TextField } from "@mui/material"
import { useEffect, useState } from "react"


export function ToySort({ onSetSortBy, sortBy }) {

    const [sortByToEdit, setSortByToEdit] = useState({ ...sortBy })

    useEffect(() => {
        onSetSortBy(sortByToEdit)
    }, [sortByToEdit])

    function handleChange({ target }) {
        const field = target.name
        const value = target.type === 'number' ? +target.value : target.value
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

    const sortOpts = [
        { label: 'Date', value: 'createdAt' },
        { label: 'Price', value: 'price' },
        { label: 'Name', value: 'name' }
    ]

    return (
        <section className="toy-sort">
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
            >

                <TextField
                    id="outlined-select-currency"
                    select
                    className="sort-type"
                    label="Sort by"
                    name="type"
                    value={sortByToEdit.type}
                    onChange={handleChange}
                    size="small"

                >
                    {sortOpts.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>

                {/* <label>
                    <input
                        type="checkbox"
                        name="dir"
                        checked={sortByToEdit.dir < 0}
                        onChange={handleChange}

                        disabled={!sortByToEdit.type}
                    />
                    Descending
                </label> */}

                <Checkbox
                    name="dir"
                    checked={sortByToEdit.dir < 0}
                    onChange={handleChange}
                    disabled={!sortByToEdit.type}
                    label="Descending"
                />

            </Box>

        </section>

    )
}
