import { dbContext } from '../db/DbContext.js'
import { BadRequest, Forbidden } from '../utils/Errors'
class BacklogItemsService {
  async getAll(query = {}) {
    return await dbContext.BacklogItem.find(query).populate('projectId')
  }

  async getById(id) {
    const backlog = await dbContext.BacklogItem.findById(id)
    if (!backlog) {
      throw new BadRequest('invalid id')
    }
  }

  async edit(body) {
    await this.getById(body.id)
    const backlog = await dbContext.BacklogItem.findByIdAndUpdate(body.id, body, { new: true, runValidators: true })
    return backlog
  }

  async create(body) {
    return await dbContext.BacklogItem.create(body)
  }

  async destroy(id, userId) {
    const backlog = await dbContext.BacklogItem.findById(id)
    if (!backlog) {
      throw new BadRequest('Invalid ID')
    }
    if (backlog.creatorId.toString() !== userId) {
      throw new Forbidden('This is not your BacklogItem')
    }
    return await dbContext.BacklogItem.findByIdAndDelete(id)
  }
}

export const backlogItemsService = new BacklogItemsService()
