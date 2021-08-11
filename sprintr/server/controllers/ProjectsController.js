import BaseController from '../utils/BaseController'
import { projectsService } from '../services/ProjectsService'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { backlogItemsService } from '../services/BacklogItemsService'
export class ProjectsController extends BaseController {
  constructor() {
    super('projects')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getAll)
      .get('/:id/backlogitems', this.getAllBacklogItems)
      .get('/:id/', this.getAllBacklogItems)
      .post('', this.create)
      .delete('/:id', this.destroy)
      .put('/:id', this.edit)
  }

  async getAll(req, res, next) {
    try {
      const project = await projectsService.getAll({ creatorId: req.userInfo.id })
      res.send(project)
    } catch (error) {
      next(error)
    }
  }

  async getAllBacklogItems(req, res, next) {
    try {
      const backlog = await backlogItemsService.getAll({ projectId: req.params.id })
      res.send(backlog)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const project = await projectsService.create(req.body)
      res.send(project)
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      req.body.id = req.params.id
      const project = await projectsService.edit(req.body)
      res.send(project)
    } catch (error) {
      next(error)
    }
  }

  async destroy(req, res, next) {
    try {
      const project = await projectsService.destroy(req.params.id, req.userInfo.id)
      res.send({ message: `Project ${project.name} deleted` })
    } catch (error) {
      next(error)
    }
  }
}
