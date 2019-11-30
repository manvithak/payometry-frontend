import {get} from './common';
import {reportsUrl, reportsCountUrl} from '../utils/urls';

export const getReports = async (headers, pageData, callback) => {
  let url = reportsUrl + pageData.skip + '&limit=' + pageData.limit
  get(url, headers, (err, response) => {
    if(err){
      callback(err, null)
    }else{
      callback(null, response)
    }
  })
}

export const getReportsCount = async (headers, callback) => {
  get(reportsCountUrl, headers, (err, response) => {
    if(err){
      callback(err, null)
    }else{
      callback(null, response)
    }
  })
}
