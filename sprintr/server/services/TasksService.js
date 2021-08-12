import { dbContext } from '../db/DbContext.js'
import { BadRequest, Forbidden } from '../utils/Errors'
class TasksService {
  async getAll(query = {}) {
    return await dbContext.Task.find(query)
      .populate('projectId')
      .populate('sprint')
      .populate('backlogItemId')
  }

  async getById(id) {
    const task = await dbContext.Task.findById(id)
    if (!task) {
      throw new BadRequest('invalid id')
    }
  }

  async edit(body) {
    await this.getById(body.id)
    const task = await dbContext.Task.findByIdAndUpdate(body.id, body, { new: true, runValidators: true })
    return task
  }

  async create(body) {
    return await dbContext.Task.create(body)
  }

  async destroy(id, userId) {
    const task = await dbContext.Task.findById(id)
    if (!task) {
      throw new BadRequest('Invalid ID')
    }
    if (task.creatorId.toString() !== userId) {
      throw new Forbidden('This is not your Task')
    }
    return await dbContext.Task.findByIdAndDelete(id)
  }
}

export const tasksService = new TasksService()
