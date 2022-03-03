import axios from 'axios'

export default class BaseDataService {
  constructor () {
    const token = localStorage.getItem('principal')
    this.http = axios.create({ baseURL: process.env.VUE_APP_BASEURL })
    this.cancelToken = axios.CancelToken
    this.source = undefined

    this.http.interceptors.response.use(
      response => response,
      err => { return Promise.reject(err) }
    )

    this.http.interceptors.request.use(config => {
      config.headers['Authorization'] = 'Bearer ' + token
      return config
    })
  }

  makeCancelTokenSource () {
    if (this.source) this.source.cancel('Request Canceled')
    this.source = undefined
    this.source = this.cancelToken.source()
  }

  async getAll (url, DataItemType, filter) {
    await this.makeCancelTokenSource()
    const modifiedFilter = Object.entries(filter).reduce((output,[key,value]) => (value ? (output[key]=value, output) : output), {})
    return this.fetch(url, modifiedFilter, DataItemType, this.source.token)
  }

  fetch (url, params, DataItemType, cancelToken) {
    const config = {params}
    if (this.source && cancelToken) config.cancelToken = cancelToken
    
    return this.http.get(url, config)
      .then(response => fixResponse(response, DataItemType))
  }

  save (url, data, params, DataItemType) {
    const method = data.isNew ? 'post' : 'put'
    const key = data.id
    if (key && !data.isNew) url += '/' + key

    return this.http({ url, method, data, params })
      .then(response => fixResponse(response, DataItemType))
  }

  remove (url, params, DataItemType) {
    return this.http({ url, method: 'delete', params })
      .then(response => fixResponse(response, DataItemType))
  }
}

function fixResponse (response, DataItemType) {
  const body = response.data || {}
  if (body.data && DataItemType) {
    body.data = modelFactory(DataItemType, body.data, body)
  }
  return body
}

function modelFactory (ItemType, data, meta) {
  if (Array.isArray(data)) {
    return data.map(datum => new ItemType(datum, meta))
  } else {
    return new ItemType(data, meta)
  }
}
