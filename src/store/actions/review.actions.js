import { reviewService } from "../../services/review.service.js"

import { store } from '../store.js'
import { ADD_REVIEW, REMOVE_REVIEW, SET_REVIEWS } from '../reducers/review.reducer.js'

// import { SET_SCORE, SET_WATCHED_USER } from './user.reducer'

// Action Creators
export function getActionRemoveReview(reviewId) {
  return { type: REMOVE_REVIEW, reviewId }
}
export function getActionAddReview(review) {
  return { type: ADD_REVIEW, review }
}
// export function getActionSetWatchedUser(user) {
//   return { type: SET_WATCHED_USER, user }
// }

export async function loadReviews(filterBy) {
  try {
    const reviews = await reviewService.query(filterBy)
    store.dispatch({ type: SET_REVIEWS, reviews })

  } catch (err) {
    console.log('ReviewActions: err in loadReviews', err)
    throw err
  }
}

export async function addReview(review) {

  const reviewToBE = {
    txt: review.txt,
    toyId: review.toy._id,
  }

  try {
    const addedReview = await reviewService.add(reviewToBE)

    delete addedReview.userId
    delete addedReview.toyId
    const { name, price, _id: toyId } = review.toy
    const { fullname, _id: userId } = review.user
    const reviewToFE = {
      ...addedReview, toy: { name, price, _id: toyId }, user: { _id: userId, fullname }
    }

    store.dispatch(getActionAddReview(reviewToFE))
    return addedReview
  } catch (err) {
    console.log('ReviewActions: err in addReview', err)
    throw err
  }
}

export async function removeReview(reviewId) {
  try {
    await reviewService.remove(reviewId)
    store.dispatch(getActionRemoveReview(reviewId))
  } catch (err) {
    console.log('ReviewActions: err in removeReview', err)
    throw err
  }
}