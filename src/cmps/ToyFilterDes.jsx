
import { useEffect, useState } from "react"
import { toyService } from "../services/toy.service"
import { Box, Chip, FormControl, InputLabel, MenuItem, OutlinedInput, Select, TextField } from "@mui/material"

export function ToyFilterDes({ filterBy, onSetFilter }) {

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
                value = Math.max(1, +value)
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

    console.log('filterByToEdit', filterByToEdit)
    // console.log('selectedLabels', selectedLabels)

    const inStockOpts = [
        { label: 'Out of stock', value: 'false' },
        { label: 'Avialable', value: 'true' },
        { label: 'All', value: 'undefined' }
    ]

    const { name, inStock, labels, maxPrice } = filterByToEdit

    return (
        <section className="toy-filter">
            <h2>Filter Our Toys</h2>
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
            >

                <TextField value={name} onChange={handleChange} name="name" id="outlined-basic" label="Toy name" variant="outlined" size="small"
                />

                <TextField
                    id="outlined-select-currency"
                    select
                    label="Stock Status"
                    name="inStock"
                    value={inStock + ''}
                    onChange={handleInStockSelect}
                    size="small"

                >
                    {inStockOpts.map((option) => (
                        <MenuItem key={option.label} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>

                <TextField
                    id="outlined-number"
                    label="Max Price"
                    type="number"
                    size="small"
                    onChange={handleChange}
                    value={maxPrice || ''}
                    name="maxPrice"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />


                {/* <FormControl sx={{ m: 1, width: 300 }}>
                    <InputLabel id="demo-multiple-chip-label">Toy Labels</InputLabel>
                    <Select
                        labelId="demo-multiple-chip-label"
                        id="demo-multiple-chip"
                        size="small"
                        multiple
                        value={labels || []}
                        onChange={handleLabels}
                        input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                        renderValue={(selected) => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {selected.map((value) => (
                                    <Chip key={value} label={value} />
                                ))}
                            </Box>
                        )}
                    >
                        {toyService.gLabels.map((label) => (
                            <MenuItem
                                key={label}
                                value={label}
                            >
                                {label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl> */}

                <label htmlFor="labels">Label:</label>
                <select name="labels" id="labels" onChange={handleLabels} value={labels || []} multiple>
                    <option value="">All</option>
                    {toyService.gLabels.map((label) => (
                        <option key={label} value={label}>
                            {label}
                        </option>
                    ))}
                </select>

            </Box>

        </section>
    )
}