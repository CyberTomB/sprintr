import { dbContext } from '../db/DbContext.js'
import { BadRequest, Forbidden } from '../utils/Errors'
class SprintsService {
  async getAll(query) {
    return await dbContext.Sprint.find(query)
      .populate('projectId')
  }

  async getById(id) {
    const sprint = await dbContext.Sprint.findById(id)
    if (!sprint) {
      throw new BadRequest('invalid id')
    }
  }

  async edit(body) {
    await this.getById(body.id)
    const sprint = await dbContext.Sprint.findByIdAndUpdate(body.id, body, { new: true, runValidators: true })
    return sprint
  }

  async create(body) {
    return await dbContext.Sprint.create(body)
  }

  async destroy(id, userId) {
    const sprint = await dbContext.Sprint.findById(id)
    if (!sprint) {
      throw new BadRequest('Invalid ID')
    }
    if (sprint.creatorId.toString() !== userId) {
      throw new Forbidden('This is not your Sprint')
    }
    // update tasks after deleting sprint
    await dbContext.Task.updateMany({ sprintId: id }, { sprintId: null })
    return await dbContext.Sprint.findByIdAndDelete(id)
  }
}

export const sprintsService = new SprintsService()
