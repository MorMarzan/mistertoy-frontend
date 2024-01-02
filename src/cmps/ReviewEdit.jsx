import { useEffect, useState } from "react"

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { addReview } from '../store/actions/review.actions.js'

export function ReviewEdit({ review, toy, user, setMsgUpdated }) {

    const [reviewToEdit, setReviewToEdit] = useState({ txt: '' })

    useEffect(() => {
        if (review) setReviewToEdit({ txt: review.txt })
    }, [])

    async function onSaveReview(ev) {
        ev.preventDefault()
        try {
            // const reviewToAdd = { ...reviewToEdit, toyId: toy._id }
            const reviewToAdd = { ...reviewToEdit, toy, user }
            const savedReview = await addReview(reviewToAdd)
            showSuccessMsg(`Review updated successfully ${savedReview.txt}`)
            setMsgUpdated(true) // render details
            setReviewToEdit({ txt: '' }) //reset form
        } catch (err) {
            console.log('Cannot update review', err)
            showErrorMsg('Cannot update review')
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

        setReviewToEdit(prevReview => ({ ...prevReview, [field]: value }))
    }


    const { txt } = reviewToEdit

    return (
        <section className="review-edit">
            <form onSubmit={onSaveReview} className="flex align-center gap">
                <label htmlFor="txt">Review</label>
                <input onChange={handleChange} value={txt} type="text" name="txt" id="txt" />
                <button className="btn" disabled={!txt}>Save Review</button>
            </form>
        </section>
    )
}