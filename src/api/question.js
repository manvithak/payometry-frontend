import {get, post} from './common';
import {getQuestionsUrl, saveAnswersUrl} from '../utils/urls'


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
