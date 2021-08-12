import BaseController from '../utils/BaseController'
import { tasksService } from '../services/TasksService'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { notesService } from '../services/NotesService'
export class TasksController extends BaseController {
  constructor() {
    super('api/tasks')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getAll)
      .get('/:id', this.getAllNotesByTaskId)
      .post('', this.create)
      .delete('/:id', this.destroy)
      .put('/:id', this.edit)
  }

  async getAll(req, res, next) {
    try {
      const task = await tasksService.getAll({ creatorId: req.userInfo.id })
      res.send(task)
    } catch (error) {
      next(error)
    }
  }

  async getAllNotesByTaskId(req, res, next) {
    try {
      const notes = await notesService.getAll({ taskId: req.params.id })
      res.send(notes)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const task = await tasksService.create(req.body)
      res.send(task)
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      req.body.id = req.params.id
      const task = await tasksService.edit(req.body)
      res.send(task)
    } catch (error) {
      next(error)
    }
  }

  async destroy(req, res, next) {
    try {
      const task = await tasksService.destroy(req.params.id, req.userInfo.id)
      res.send({ message: `Task ${task.name} deleted` })
    } catch (error) {
      next(error)
    }
  }
}
