import {get, post, put} from './common';
import {getQuestionsUrl, saveAnswersUrl, getAnswersUrl, updateAnswersUrl} from '../utils/urls'


export const getQuestions = async (headers, callback) => {
  get(getQuestionsUrl, headers, (err, response) => {
    if (err) {
      callback(err, null)
    } else {
      callback(null, response)
    }
  })
}

export const saveAnswers = async (data, headers, callback) => {
  post(saveAnswersUrl, data, headers, (err, response) => {
    if(err) {
      callback(err, null)
    }else {
      callback(null, response)
    }
  })
}

export const getAnswers = async (headers, callback) => {
  get(getAnswersUrl, headers, (err, response) => {
    if(err) {
      callback(err, null)
    } else {
      callback(null, response)
    }
  })
}

export const updateAnswers = async (id, data, headers, callback) => {
  put(updateAnswersUrl, data, headers, (err, response) => {
    if(err) {
      callback(err, null)
    } else{
      callback(null, response)
    }
  })
}
