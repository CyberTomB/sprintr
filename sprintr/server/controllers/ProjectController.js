import BaseController from '..//utils/BaseController'
import { projectService } from '../services/ProjectService'
import { Auth0Provider } from '@bcwdev/auth0provider'
export class ProjectController extends BaseController {
  constructor() {
    super('project')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getAll)
      .post('', this.create)
      .delete('/:id', this.destroy)
      .put('/:id', this.edit)
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
      req.body.creatorId = req.userInfo.id
      const project = await projectService.create(req.body)
      res.send(project)
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      req.body.id = req.params.id
      const project = await projectService.edit(req.body)
      res.send(project)
    } catch (error) {
      next(error)
    }
  }

  async destroy(req, res, next) {
    try {
      const project = await projectService.destroy(req.params.id, req.userInfo.id)
      res.send({ message: `Project ${project.name} deleted` })
    } catch (error) {
      next(error)
    }
  }
}
