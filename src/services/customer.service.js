import BaseDataService from './_base-data.service'
import { CustomerModel } from '../models/customer.model'

export class CustomerService extends BaseDataService {
  getCustomers () {
    return this.getAll('admin/user-listing', CustomerModel)
  }
  saveCustomer (customer) {
    const url = customer.isNew ? 'user/create' : 'admin/user-edit'
    return this.save(url, customer, {}, CustomerModel)
  }
}

const service = new CustomerService()
export default service
