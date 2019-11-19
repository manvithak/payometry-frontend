import axios from 'axios'

const commonHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  //sessionId: 'zaasna-123',
  //'App-Id': 'CONSUMER_ANDROID',
  //Source: 'Mobile'
}

const appendHeaders = (headers) => {
  const obj = Object.assign({}, commonHeaders, headers)
  return obj
}

export const get = async (url, headers, callback) => {
  const projectHeaders = appendHeaders(headers)
  axios.get(url,
    {
      headers: projectHeaders
    })
    .then((response) => {
      callback(null, response)
    })
    .catch((err) => {
      callback(err, null)
    })
}


export const post = async (url, data, headers, callback) => {
  const projectHeaders = appendHeaders(headers)
  axios.post(url, data,
    {
      headers: projectHeaders
    })
    .then((response) => {
      callback(null, response)
    })
    .catch((err) => {
      callback(err, null)
    })
}

export const put = async (url, data, headers, callback) => {
  const projectHeaders = appendHeaders(headers)
  axios.put(url, data, {
    headers: projectHeaders
  })
    .then((response) => {
      callback(null, response)
    })
    .catch((err) => {
      callback(err, null)
    })
}

export const destroy = async (url, headers, callback) => {
  const projectHeaders = appendHeaders(headers)
  axios.delete(url, {
    headers: projectHeaders
  })
    .then((response) => {
      callback(null, response)
    })
    .catch((err) => {
      callback(err, null)
    })
}
