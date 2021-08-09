import { dbContext } from '../db/DbContext.js'
import { BadRequest, Forbidden } from '../utils/Errors'
class BacklogService {
  async getAll(query = {}) {
    return await dbContext.Backlog.find(query)
  }

  async getById(id) {
    const backlog = await dbContext.Backlog.findById(id)
    if (!backlog) {
      throw new BadRequest('invalid id')
    }
  }

  async edit(body) {
    await this.getById(body.id)
    const backlog = await dbContext.Backlog.findByIdAndUpdate(body.id, body, { new: true, runValidators: true })
    return backlog
  }

  async create(body) {
    return await dbContext.Backlog.create(body)
  }

  async destroy(id, userId) {
    const backlog = await dbContext.Backlog.findById(id)
    if (!backlog) {
      throw new BadRequest('Invalid ID')
    }
    if (backlog.creatorId.toString() !== userId) {
      throw new Forbidden('This is not your Backlog')
    }
    return await dbContext.Backlog.findByIdAndDelete(id)
  }
}

export const backlogService = new BacklogService()
