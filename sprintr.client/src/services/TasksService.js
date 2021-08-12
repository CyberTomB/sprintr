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

  async getTasksByProjectId(id) {
    const res = await api.get('api/projects/' + id + '/tasks')
    console.log(res.data)
    AppState.tasks = res.data
  }

  async delete(id) {
    if (await Pop.confirm()) {
      try {
        const res = await api.delete('api/tasks' + id)
        Pop.toast(res.data.message)
        AppState.tasks = AppState.tasks.filter(t => t.id !== id)
      } catch (error) {
        Pop.toast(error)
      }
    }
  }
}

export const tasksService = new TasksService()
