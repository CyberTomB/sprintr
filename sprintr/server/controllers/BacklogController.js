import BaseController from '../utils/BaseController'
import { backlogService } from '../services/BacklogService'
import { Auth0Provider } from '@bcwdev/auth0provider'
export class BacklogController extends BaseController {
  constructor() {
    super('backlog')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getAll)
      .post('', this.create)
      .delete('/:id', this.destroy)
      .put('/:id', this.edit)
  }

  async getAll(req, res, next) {
    try {
      const backlog = await backlogService.getAll(req.query)
      res.send(backlog)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const backlog = await backlogService.create(req.body)
      res.send(backlog)
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      req.body.id = req.params.id
      const backlog = await backlogService.edit(req.body)
      res.send(backlog)
    } catch (error) {
      next(error)
    }
  }

  async destroy(req, res, next) {
    try {
      const backlog = await backlogService.destroy(req.params.id, req.userInfo.id)
      res.send({ message: `Project ${backlog.name} deleted` })
    } catch (error) {
      next(error)
    }
  }
}
