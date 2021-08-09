import { dbContext } from '../db/DbContext.js'
import { BadRequest } from '../utils/Errors'
class ProjectService {
  async getById(id) {
    const project = await dbContext.Project.findById(id)
    if (!project) {
      throw new BadRequest('invalid id')
    }
  }

  async destroy(id) {
    await this.getById(id)
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
