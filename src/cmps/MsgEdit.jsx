import { useEffect, useState } from "react"

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { saveToyMsg } from '../store/actions/toy.actions.js'

export function MsgEdit({ msg, toyId, setMsgUpdated }) {

    const [msgToEdit, setMsgToEdit] = useState({ txt: '' })

    useEffect(() => {
        if (msg) setMsgToEdit({ txt: msg.txt })
    }, [])

    async function onSaveMsg(ev) {
        ev.preventDefault()
        try {
            const savedMsg = await saveToyMsg(msgToEdit, toyId)
            showSuccessMsg(`Msg updated successfully ${savedMsg.txt}`)
            setMsgUpdated(true) // render details
            setMsgToEdit({ txt: '' }) //reset form
        } catch (err) {
            console.log('Cannot update msg', err)
            showErrorMsg('Cannot update msg')
        }
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

        setMsgToEdit(prevMsg => ({ ...prevMsg, [field]: value }))
    }


    const { txt } = msgToEdit

    return (
        <section className="msg-edit">
            <form onSubmit={onSaveMsg}>
                <label htmlFor="txt">Msg</label>
                <input onChange={handleChange} value={txt} type="text" name="txt" id="txt" />
                <button className="btn" disabled={!txt}>Save Msg</button>
            </form>
        </section>
    )
}