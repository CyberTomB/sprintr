import BaseController from '../utils/BaseController'
import { notesService } from '../services/NotesService'
import { Auth0Provider } from '@bcwdev/auth0provider'
export class NotesController extends BaseController {
  constructor() {
    super('notes')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getAll)
      .post('', this.create)
      .delete('/:id', this.destroy)
      .put('/:id', this.edit)
  }

  async getAll(req, res, next) {
    try {
      const note = await notesService.getAll({ creatorId: req.userInfo.id })
      res.send(note)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const note = await notesService.create(req.body)
      res.send(note)
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      req.body.id = req.params.id
      const note = await notesService.edit(req.body)
      res.send(note)
    } catch (error) {
      next(error)
    }
  }

  async destroy(req, res, next) {
    try {
      const note = await notesService.destroy(req.params.id, req.userInfo.id)
      res.send({ message: `Note ${note.name} deleted` })
    } catch (error) {
      next(error)
    }
  }
}
