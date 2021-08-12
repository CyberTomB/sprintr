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
      const res = await api.post('api/tasks', newTask)
      AppState.tasks.push(res.data)
      Pop.toast('Task Created')
      console.log(res.data)
    } catch (error) {
      Pop.toast(error)
    }
  }

  async getTasksByProjectId(id) {
    const res = await api.get('api/projects/' + id + '/tasks')
    console.log(res.data)
    AppState.tasks = res.data
  }

  async edit(task, newSprintId) {
    debugger
    task.sprintId = newSprintId
    const res = await api.put('api/tasks/' + task.id, task)
  }

  async delete(id) {
    if (await Pop.confirm()) {
      try {
        const res = await api.delete('api/tasks/' + id)
        Pop.toast(res.data.message)
        AppState.tasks = AppState.tasks.filter(t => t.id !== id)
      } catch (error) {
        Pop.toast(error)
      }
    }
  }
}

export const tasksService = new TasksService()
