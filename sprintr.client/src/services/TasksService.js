import { AppState } from '../AppState'
import { api } from './AxiosService'
import Pop from '../utils/Notifier'

class TasksService {
  // REVIEW: How do I make this RESTful?
  async getAllTasks(backlogId) {
    const res = await api.get('api/backlog/' + backlogId + '/tasks')
    console.log(res.data)
    AppState.tasks = res.data
  }

  async create(newTask) {
    try {
      const res = await api.post('api/backlog', newTask)
      AppState.tasks.push(res.data)
      return res.data.id
    } catch (error) {
      Pop.toast(error)
    }
  }
}

export const tasksService = new TasksService()
