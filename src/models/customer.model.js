import { BaseModel } from "./_base.model"

export class CustomerModel extends BaseModel {
  constructor(data) {
    super(data)
    
    const d = data || {}

    this.first_name = d.first_name
    this.last_name = d.last_name
    this.email = d.email
    this.email_verified_at = d.email_verified_at
    this.avatar = d.avatar
    this.address = d.address
    this.phone_number = d.phone_number
    this.is_marketing = d.is_marketing
    this.password = d.password
    this.password_confirmation = d.password_confirmation
  }

  get isNew () {
      return this.id === null || this.id === undefined
  }
}
