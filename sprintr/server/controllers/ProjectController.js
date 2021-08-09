import BaseController from '..//utils/BaseController'
import { projectService } from '../services/ProjectService'
export class ProjectController extends BaseController {
  constructor() {
    super('project')
    this.router
      .post('', this.create)
  }

  async create(req, res, next) {
    try {
      const project = await projectService.create(req.body)
      res.send(project)
    } catch (error) {
      next(error)
    }
  }
}
