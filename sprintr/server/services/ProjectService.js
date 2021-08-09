import { dbContext } from '../db/DbContext.js'
import { BadRequest, Forbidden } from '../utils/Errors'
class ProjectService {
  async edit(body) {
    await this.getById(body.id)
    const project = await dbContext.Project.findByIdAndUpdate(body.id, body, { new: true, runValidators: true })
    return project
  }

  async getById(id) {
    const project = await dbContext.Project.findById(id)
    if (!project) {
      throw new BadRequest('invalid id')
    }
  }

  async destroy(id, userId) {
    const project = await dbContext.Project.findById(id)
    if (!project) {
      throw new BadRequest('Invalid ID')
    }
    if (project.creatorId.toString() !== userId) {
      throw new Forbidden('This is not your Project')
    }
    return await dbContext.Project.findByIdAndDelete(id)
  }

  async getAll(query = {}) {
    return await dbContext.Project.find(query)
  }

  async create(body) {
    return await dbContext.Project.create(body)
  }
}

export const projectService = new ProjectService()
