import { AppState } from '../AppState'
import { api } from './AxiosService'

class NotesService {
  async getAllNotesByTaskId(id) {
    const res = await api.get('api/tasks/' + id)
    AppState.notes = res.data
  }

  async create(newNote) {
    const res = await api.post('api/notes', newNote)
    AppState.notes.push(res.data)
  }
}

export const notesService = new NotesService()
