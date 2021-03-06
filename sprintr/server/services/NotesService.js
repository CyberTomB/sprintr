import { dbContext } from '../db/DbContext.js'
import { BadRequest, Forbidden } from '../utils/Errors'
class NotesService {
  async getAll(query) {
    return await dbContext.Note.find(query)
      .populate('taskId')
      .populate('creator')
  }

  async getById(id) {
    const note = await dbContext.Note.findById(id).populate('creator')
    if (!note) {
      throw new BadRequest('invalid id')
    }
  }

  async edit(body) {
    await this.getById(body.id)
    const note = await dbContext.Note.findByIdAndUpdate(body.id, body, { new: true, runValidators: true })
    return note
  }

  async create(body) {
    const note = await dbContext.Note.create(body)
    return await note.populate('creator').execPopulate()
  }

  async destroy(id, userId) {
    const note = await dbContext.Note.findById(id)
    if (!note) {
      throw new BadRequest('Invalid ID')
    }
    if (note.creatorId.toString() !== userId) {
      throw new Forbidden('This is not your Note')
    }
    return await dbContext.Note.findByIdAndDelete(id)
  }
}

export const notesService = new NotesService()
