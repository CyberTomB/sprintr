import BaseController from '..//utils/BaseController'
import { projectService } from '../services/ProjectService'
export class ProjectController extends BaseController {
  constructor() {
    super('project')
    this.router
      .get('', this.getAll)
      .post('', this.create)
      .delete('/:id', this.destroy)
  }

  async getAll(req, res, next) {
    try {
      const project = await projectService.getAll(req.query)
      res.send(project)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      const project = await projectService.create(req.body)
      res.send(project)
    } catch (error) {
      next(error)
    }
  }

  async destroy(req, res, next) {
    try {
      const project = await projectService.destroy(req.params.id)
      res.send({ message: `Project ${req.params.id} deleted` })
    } catch (error) {
      next(error)
    }
  }
}
