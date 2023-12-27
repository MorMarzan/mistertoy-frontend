import { useSelector } from "react-redux"
import { useEffect, useRef } from "react"
import { Link } from "react-router-dom"

import { ToyList } from "../cmps/ToyList"
import { ToyFilter } from "../cmps/ToyFilter"
import { ToySort } from "../cmps/ToySort"
import { loadToys, removeToy, setFilterBy, setSortBy } from "../store/actions/toy.actions"
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { utilService } from "../services/util.service"
// import { Loader } from '../cmps/Loader.jsx'

export function ToyIndex() {

    const toys = useSelector(storeState => storeState.toyModule.toys)
    // const isLoading = useSelector(storeState => storeState.toyModule.isLoading)
    const filterBy = useSelector(storeState => storeState.toyModule.filterBy)
    const sortBy = useSelector(storeState => storeState.toyModule.sortBy)
    const debounceOnSetFilter = useRef(utilService.debounce(onSetFilter, 500))

    useEffect(() => {
        loadToys()
            .catch(() => { showErrorMsg('Cannot show toys') })
    }, [filterBy, sortBy])

    function onRemoveToy(toyId) {
        removeToy(toyId)
            .then(() => {
                showSuccessMsg('Toy removed')
            })
            .catch(err => {
                console.log('Cannot remove toy', err)
                showErrorMsg('Cannot remove toy')
            })
    }

    function onSetFilter(filterBy) {
        setFilterBy(filterBy)
    }

    function onSetSortBy(sortBy) {
        setSortBy(sortBy)
    }

    const { name, inStock, labels, maxPrice } = filterBy
    // console.log('isLoading', isLoading)

    return (
        <main>
            <section className="toy-index">

                <ToyFilter
                    filterBy={{ name, inStock, labels, maxPrice }}
                    onSetFilter={debounceOnSetFilter.current}
                />
                <ToySort onSetSortBy={onSetSortBy} sortBy={sortBy} />
                <Link className='edit btn' to={`/toy/edit/`}>Add toy</Link>
                <ToyList toys={toys} onRemoveToy={onRemoveToy} />

            </section>
        </main>
    )

}