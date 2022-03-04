import BaseDataService from './_base-data.service'
import { IdentityModel } from '../models/identity.model'

export class IdentityService extends BaseDataService {
  logIn (params) {
    return this.save('admin/login', params, {}, IdentityModel)
  }
}

const service = new IdentityService()
export default service
