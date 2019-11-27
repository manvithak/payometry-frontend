import {get} from './common';
import {reportsUrl} from '../utils/urls';

export const getReports = async (headers, callback) => {
  get(reportsUrl, headers, (err, response) => {
    if(err){
      callback(err, null)
    }else{
      callback(null, response)
    }
  })
}
