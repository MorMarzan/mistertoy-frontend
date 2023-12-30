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
    const user = useSelector(storeState => storeState.userModule.loggedinUser)
    // const isLoading = useSelector(storeState => storeState.toyModule.isLoading)
    const filterBy = useSelector(storeState => storeState.toyModule.filterBy)
    const sortBy = useSelector(storeState => storeState.toyModule.sortBy)
    const debounceOnSetFilter = useRef(utilService.debounce(onSetFilter, 500))

    useEffect(() => {
        _loadToys()
    }, [filterBy, sortBy])

    async function _loadToys() {
        try {
            await loadToys()
        } catch (error) {
            console.error('Error loading toys:', error)
            showErrorMsg('Cannot show toys')
        }
    }

    async function onRemoveToy(toyId) {
        try {
            await removeToy(toyId)
            showSuccessMsg('Toy removed')
        } catch (err) {
            console.log('Cannot remove toy', err)
            showErrorMsg('Cannot remove toy')
        }
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
        <>
            <section className="toy-index main-layout full">
                <ToyFilter
                    filterBy={{ name, inStock, labels, maxPrice }}
                    onSetFilter={debounceOnSetFilter.current}
                    onSetSortBy={onSetSortBy} sortBy={sortBy}
                    user={user}
                />


                <ToyList toys={toys} onRemoveToy={onRemoveToy} user={user} />
            </section>
        </>
    )

}