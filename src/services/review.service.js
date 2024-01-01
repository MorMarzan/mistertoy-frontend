import { httpService } from './http.service'
import { storageService } from './async-storage.service'
import { userService } from './user.service'

const BASE_URL = 'review/'

export const reviewService = {
  add,
  query,
  remove
}

function query(filterBy = {}) {
  return httpService.get(BASE_URL, filterBy)
  // return storageService.query('review')
}

async function remove(reviewId) {
  return httpService.delete(BASE_URL + reviewId)
  // await storageService.remove('review', reviewId)
}

async function add(txt) {
  // const addedReview = await httpService.post(`review`, { txt, aboutUserId })
  return httpService.post(BASE_URL, txt)

  // const aboutUser = await userService.getById(aboutUserId)

  // const reviewToAdd = {
  //   txt,
  //   byUser: userService.getLoggedinUser(),
  //   aboutUser: {
  //     _id: aboutUser._id,
  //     fullname: aboutUser.fullname,
  //     imgUrl: aboutUser.imgUrl
  //   }
  // }

  // reviewToAdd.byUser.score += 10
  // await userService.update(reviewToAdd.byUser)
  // const addedReview = await storageService.post('review', reviewToAdd)
  // return addedReview
}