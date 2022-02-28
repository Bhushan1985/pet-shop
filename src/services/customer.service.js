import BaseDataService from './_base-data.service'
import { CustomerModel } from '../models/customer.model'

export class CustomerService extends BaseDataService {
  getCustomers () {
    return this.getAll('user-listing', CustomerModel)
  }
}

const service = new CustomerService()
export default service
