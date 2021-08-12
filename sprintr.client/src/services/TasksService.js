import { AppState } from '../AppState'
import { api } from './AxiosService'

class TasksService {
  // REVIEW: How do I make this RESTful?
  async getAllTasks(backlogId) {
    const res = await api.get('api/backlog/' + backlogId + '/tasks')
    console.log(res.data)
    AppState.tasks = res.data
  }
}

export const tasksService = new TasksService()
