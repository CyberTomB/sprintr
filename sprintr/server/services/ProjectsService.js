import { dbContext } from '../db/DbContext.js'
import { BadRequest, Forbidden } from '../utils/Errors'
class ProjectsService {
  async getAll(query) {
    return await dbContext.Project.find(query)
  }

  async getById(id) {
    const project = await dbContext.Project.findById(id)
    if (!project) {
      throw new BadRequest('invalid id')
    }
  }

  async edit(body) {
    await this.getById(body.id)
    const project = await dbContext.Project.findByIdAndUpdate(body.id, body, { new: true, runValidators: true })
    return project
  }

  async create(body) {
    return await dbContext.Project.create(body)
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
}

export const projectsService = new ProjectsService()
