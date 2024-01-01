import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import { loadToy, removeToyMsg } from '../store/actions/toy.actions.js'
import { utilService } from '../services/util.service.js'
import { MsgEdit } from '../cmps/MsgEdit.jsx'
import { MsgList } from '../cmps/MsgList.jsx'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { useSelector } from 'react-redux'
import { loadReviews, removeReview } from '../store/actions/review.actions.js'
import { ReviewList } from '../cmps/ReviewList.jsx'
import { ReviewEdit } from '../cmps/ReviewEdit.jsx'

export function ToyDetails() {

    const { toyId } = useParams()
    const [toy, setToy] = useState(null)
    const [msgUpdated, setMsgUpdated] = useState(false)
    const user = useSelector(storeState => storeState.userModule.loggedinUser)
    const reviews = useSelector(storeState => storeState.reviewModule.reviews)

    useEffect(() => {
        _loadToy()
        _loadReviews()
    }, [toyId, msgUpdated])

    async function _loadToy() {
        try {
            const loadedToy = await loadToy(toyId)
            setToy(loadedToy)
            setMsgUpdated(false)
        } catch (err) {
            console.error('Error loading toy:', err)
        }
    }

    async function _loadReviews() {
        try {
            await loadReviews({ toyId: toyId })
            // setMsgUpdated(false)
        } catch (err) {
            console.error('Error loading toy:', err)
        }
    }

    async function onRemoveMsg(msgId) {
        try {
            await removeToyMsg(msgId, toyId)
            showSuccessMsg('Msg removed')
            setMsgUpdated(true)
        } catch (err) {
            console.log('Cannot remove msg', err)
            showErrorMsg('Cannot remove msg')
        }
    }

    async function onRemoveReview(reviewId) {
        try {
            await removeReview(reviewId)
            showSuccessMsg('Review removed')
            setMsgUpdated(true)
        } catch (err) {
            console.log('Cannot remove review', err)
            showErrorMsg('Cannot remove review')
        }
    }

    if (!toy) return <div>Loading...</div>

    const { name, price, inStock, _id, labels, msgs } = toy //replace createdAt with _id so it'll work with mongo's id
    const createdAt = utilService.objectIdToDate(_id)

    return (
        <section className="page toy-details">
            <h2>Toy Details</h2>
            <h3>Toy: {utilService.capitalizeFirstLetter(name)}</h3>
            <h3>Price: {price}$</h3>
            <h3>In stock? {inStock ? 'yes' : 'no'}</h3>
            <h3>Created: {utilService.formatTimestamp(createdAt)}</h3>
            <h3>Labels: {labels.join(', ')}</h3>

            <h3>Toy's Msgs</h3>
            <MsgList msgs={msgs} onRemoveMsg={onRemoveMsg} user={user} />
            {user ?
                <MsgEdit toyId={toyId} setMsgUpdated={setMsgUpdated} />
                :
                <p>Sign up to add new msg</p>
            }

            <h3>Toy's Reviews</h3>
            <ReviewList reviews={reviews} user={user} onRemoveReview={onRemoveReview} />
            {user ?
                <ReviewEdit toy={toy} setMsgUpdated={setMsgUpdated} user={user} />
                :
                <p>Sign up to add new msg</p>
            }

            <Link className="btn" to={'/toy'}>← Go back</Link>
        </section>
    )
}