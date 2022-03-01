import { BaseModel } from "./_base.model"

export class CustomerModel extends BaseModel {
  constructor(data) {
    super(data)
    
    const d = data || {}

    this.firstName = d.first_name
    this.lastName = d.last_name
    this.email = d.email
    this.emailVerifiedAt = d.email_verified_at
    this.avatar = d.avatar
    this.address = d.address
    this.phoneNumber = d.phone_number
    this.isMarketing = d.is_marketing
    this.profile = ''
  }

  get isNew () {
      return this.id === null || this.id === undefined
  }
}
