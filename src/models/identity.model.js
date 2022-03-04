import { BaseModel } from "./_base.model"

export class IdentityModel extends BaseModel {
  constructor(data) {
    super(data)
    
    const d = data || {}

    this.token = d.token
  }

  get isNew () {
      return this.id === null || this.id === undefined
  }
}
