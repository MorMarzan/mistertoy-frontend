// const { useEffect, useRef, Fragment } = React
// const { useSelector } = ReactRedux
// const { Link } = ReactRouterDOM

import { useSelector } from "react-redux"
import { useEffect, useRef } from "react"
import { Link } from "react-router-dom"

import { ToyList } from "../cmps/ToyList"
import { ToyFilter } from "../cmps/ToyFilter"
import { loadToys, removeToy, setFilterBy } from "../store/actions/toy.actions"
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { utilService } from "../services/util.service"

// import { ToyFilter } from '../cmps/ToyFilter.jsx'
// import { Loader } from '../cmps/Loader.jsx'

export function ToyIndex() {

    const toys = useSelector(storeState => storeState.toyModule.toys)
    // const user = useSelector(storeState => storeState.userModule.loggedinUser)
    // const isLoading = useSelector(storeState => storeState.toyModule.isLoading)
    const filterBy = useSelector(storeState => storeState.toyModule.filterBy)
    const debounceOnSetFilter = useRef(utilService.debounce(onSetFilter, 500))
    console.log('filterBy', filterBy)

    useEffect(() => {
        loadToys()
            .catch(() => { showErrorMsg('Cannot show toys') })
        // }, [])
    }, [filterBy])

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

    // function promptSignup() {
    //     showErrorMsg('Signup to enjoy our toys app')
    // }

    const { name, inStock, label, maxPrice } = filterBy
    // console.log('isLoading', isLoading)

    return (
        <main>
            <section className="toy-index">
                {/* {user &&  */}
                {/* // !isLoading && */}
                {/* <Fragment> */}
                <Link className='edit btn' to={`/toy/edit/`}>Add toy</Link>
                <ToyFilter filterBy={{ name, inStock, label, maxPrice }} onSetFilter={debounceOnSetFilter.current} />
                <ToyList toys={toys} onRemoveToy={onRemoveToy} />
                {/* </Fragment> */}
                {/* } */}

                {/* {!user &&
                    <Fragment>
                        <button onClick={promptSignup}>Add toy</button>
                        <h1>Start creating you're toys now!</h1>
                    </Fragment>
                } */}

            </section>
        </main>
    )

}