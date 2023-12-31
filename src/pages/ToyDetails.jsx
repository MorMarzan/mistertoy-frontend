import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import { loadToy, removeToyMsg } from '../store/actions/toy.actions.js'
import { utilService } from '../services/util.service.js'
import { MsgEdit } from '../cmps/MsgEdit.jsx'
import { MsgList } from '../cmps/MsgList.jsx'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { useSelector } from 'react-redux'

export function ToyDetails() {

    const [toy, setToy] = useState(null)
    const [msgUpdated, setMsgUpdated] = useState(false)
    const user = useSelector(storeState => storeState.userModule.loggedinUser)

    const { toyId } = useParams()

    useEffect(() => {
        _loadToy()
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

    if (!toy) return <div>Loading...</div>

    const { name, price, inStock, _id, labels, msgs } = toy //replace createdAt with _id so it'll work with mongo's id
    const createdAt = utilService.objectIdToDate(_id)

    return (
        <section className="toy-details">
            <h2>Toy Details</h2>
            <h3>Toy: {utilService.capitalizeFirstLetter(name)}</h3>
            <h3>Price: {price}$</h3>
            <h3>In stock? {inStock ? 'yes' : 'no'}</h3>
            <h3>Created: {utilService.formatTimestamp(createdAt)}</h3>
            <h3>Labels: {labels.join(', ')}</h3>

            <MsgList msgs={msgs} onRemoveMsg={onRemoveMsg} user={user} />
            {user ?
                <MsgEdit toyId={toyId} setMsgUpdated={setMsgUpdated} />
                :
                <p>Sign up to add new msg</p>
            }

            <Link className="btn" to={'/toy'}>← Go back</Link>
        </section>
    )
}