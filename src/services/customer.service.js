import BaseDataService from './_base-data.service'
import { CustomerModel } from '../models/customer.model'

export class CustomerService extends BaseDataService {
  getCustomers (filter) {
    return this.getAll('admin/user-listing', CustomerModel, filter)
  }
  saveCustomer (customer) {
    const url = customer.isNew ? 'user/create' : 'admin/user-edit'
    return this.save(url, customer, {}, CustomerModel)
  }
  deleteCustomer (id) {
    return this.remove(`admin/user-delete/${id}`, {}, CustomerModel)
  }
}

const service = new CustomerService()
export default service
