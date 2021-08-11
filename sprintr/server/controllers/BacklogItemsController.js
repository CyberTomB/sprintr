import BaseController from '../utils/BaseController'
import { backlogItemsService } from '../services/BacklogItemsService'
import { Auth0Provider } from '@bcwdev/auth0provider'
export class BacklogItemsController extends BaseController {
  constructor() {
    super('api/backlog')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getAll)
      .post('', this.create)
      .delete('/:id', this.destroy)
      .put('/:id', this.edit)
  }

  async getAll(req, res, next) {
    try {
      const backlogItem = await backlogItemsService.getAll({ creatorId: req.userInfo.id })
      res.send(backlogItem)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const backlogItem = await backlogItemsService.create(req.body)
      res.send(backlogItem)
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      req.body.id = req.params.id
      const backlogItem = await backlogItemsService.edit(req.body)
      res.send(backlogItem)
    } catch (error) {
      next(error)
    }
  }

  async destroy(req, res, next) {
    try {
      const backlogItem = await backlogItemsService.destroy(req.params.id, req.userInfo.id)
      res.send({ message: `Project ${backlogItem.name} deleted` })
    } catch (error) {
      next(error)
    }
  }
}
