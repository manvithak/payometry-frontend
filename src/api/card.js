import {post, get} from './common';
import {addCardUrl, getAccountsUrl} from '../utils/urls'

export const addCard = async(data, headers, callback) => {
  post(addCardUrl, data, headers, (err, response) => {
    if (err) {
      callback(err, null)
    } else {
      callback(null, response)
    }
  })
}

export const getAccounts = async(headers, callback) => {
  get(getAccountsUrl, headers, (err, response) => {
    if(err) {
      callback(err, null)
    } else{
      callback(null, response)
    }
  })
}


