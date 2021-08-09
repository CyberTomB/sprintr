import { dbContext } from '../db/DbContext.js'

class ProjectService {
  async create(body) {
    return await dbContext.Project.create(body)
  }
}

export const projectService = new ProjectService()
