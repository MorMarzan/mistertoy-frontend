
import { useEffect, useState } from "react"
import { toyService } from "../services/toy.service"
import { Box, Chip, FormControl, InputLabel, MenuItem, OutlinedInput, Select, Stack, TextField } from "@mui/material"
import CancelIcon from "@mui/icons-material/Cancel"
import CheckIcon from "@mui/icons-material/Check";
import { ToySort } from "./ToySort";
import { Link } from "react-router-dom";


export function ToyFilter({ filterBy, onSetFilter, onSetSortBy, sortBy }) {

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
                // value = +value
                if (value !== '') {
                    value = Math.max(+value, 1) // Ensure value is at least 1
                }
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


    function handleLabels(ev) {
        const { target: { value }, } = ev
        const newLabels = (typeof value === "string") ? value.split(",") : value
        setFilterByToEdit(prevFilter => ({ ...prevFilter, labels: newLabels }))
    }

    function handleDeleteLabels(labelToDelete) {
        const newLabels = filterByToEdit.labels.filter((label) => label !== labelToDelete)
        setFilterByToEdit(prevFilter => ({ ...prevFilter, labels: newLabels }))
    }

    // console.log('filterByToEdit.labels', filterByToEdit.labels)

    const inStockOpts = [
        { label: 'Out of stock', value: 'false' },
        { label: 'Avialable', value: 'true' },
        { label: 'All', value: 'undefined' }
    ]

    const { name, inStock, labels, maxPrice } = filterByToEdit

    return (
        <section className="toy-filter full">
            <h2>Filter Our Toys</h2>
            <Box
                component="form"
                sx={{
                    // '& > :not(style)': { m: 1, minWidth: 125 },
                }}
                noValidate
                autoComplete="off"
            >

                <TextField value={name} onChange={handleChange} name="name" id="outlined-basic" label="Toy name" variant="outlined" size="small"
                />

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

                <FormControl size="small">
                    {/* sx={{ m: 1, width: 415 }} */}

                    <InputLabel id="demo-multiple-chip-label">Toy Labels</InputLabel>
                    <Select
                        labelId="demo-multiple-chip-label"
                        id="demo-multiple-chip"
                        // size="small"
                        multiple
                        value={labels}
                        onChange={handleLabels}
                        input={<OutlinedInput id="select-multiple-chip" label="Toy Labels" />}
                        renderValue={(selected) => (
                            <Stack gap={1} direction="row" flexWrap="wrap">
                                {selected.map((value) => (
                                    <Chip
                                        key={value}
                                        label={value}
                                        onDelete={() => handleDeleteLabels(value)}
                                        deleteIcon={
                                            <CancelIcon
                                                onMouseDown={(event) => event.stopPropagation()}
                                            />
                                        }
                                    />
                                ))}
                            </Stack>
                        )}
                    >
                        {toyService.gLabels.map((label) => (
                            <MenuItem
                                key={label}
                                value={label}
                                sx={{ justifyContent: "space-between" }}
                            >
                                {label}
                                {filterByToEdit.labels.includes(label) ? <CheckIcon color="info" /> : null}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

            </Box>
            <ToySort onSetSortBy={onSetSortBy} sortBy={sortBy} />
            <Link className='edit btn' to={`/toy/edit/`}>Add toy</Link>

        </section>
    )
}