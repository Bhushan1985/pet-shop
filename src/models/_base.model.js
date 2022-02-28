export class BaseModel {
  constructor (data) {
    const d = data || {}
    this.id = d.uuid
    this.createdAt = d.created_at
    this.updatedAt = d.updated_at
    this.lastLoginAt = d.last_login_at
  }
}
