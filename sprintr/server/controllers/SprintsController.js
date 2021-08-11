import BaseController from '../utils/BaseController'
import { sprintsService } from '../services/SprintsService'
import { Auth0Provider } from '@bcwdev/auth0provider'
export class SprintsController extends BaseController {
  constructor() {
    super('api/sprints')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getAll)
      .post('', this.create)
      .delete('/:id', this.destroy)
      .put('/:id', this.edit)
  }

  async getAll(req, res, next) {
    try {
      const sprint = await sprintsService.getAll({ creatorId: req.userInfo.id })
      res.send(sprint)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const sprint = await sprintsService.create(req.body)
      res.send(sprint)
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      req.body.id = req.params.id
      const sprint = await sprintsService.edit(req.body)
      res.send(sprint)
    } catch (error) {
      next(error)
    }
  }

  async destroy(req, res, next) {
    try {
      const sprint = await sprintsService.destroy(req.params.id, req.userInfo.id)
      res.send({ message: `Project ${sprint.name} deleted` })
    } catch (error) {
      next(error)
    }
  }
}
