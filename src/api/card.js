import {post} from './common';
import {addCardUrl} from '../utils/urls'


export const addCard = async (data, headers, callback) => {
  post(addCardUrl, data, headers, (err, response) => {
    if (err) {
      callback(err, null)
    } else {
      callback(null, response)
    }
  })
}
