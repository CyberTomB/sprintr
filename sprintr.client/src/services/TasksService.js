import { AppState } from '../AppState'
import { api } from './AxiosService'
import Pop from '../utils/Notifier'
import { logger } from '../utils/Logger'

class TasksService {
  // REVIEW: How do I make this RESTful?
  async getAllTasks(parent, id) {
    const res = await api.get('api/' + parent + '/' + id)
    AppState.tasks = res.data
  }

  async create(newTask) {
    try {
      const res = await api.post('api/tasks', newTask)
      AppState.tasks.push(res.data)
      Pop.toast('Task Created', 'success')
    } catch (error) {
      Pop.toast(error)
    }
  }

  async getTasksByProjectId(id) {
    const res = await api.get('api/projects/' + id + '/tasks')
    AppState.tasks = res.data
  }

  async editSprint(task, newSprintId) {
    task.sprintId = newSprintId
    const res = await api.put('api/tasks/' + task.id, task)
    logger.log(res.data)
    // NOTE This convoluted function checks if the resultant data has a name
    return res.data.sprint ? res.data.sprint.name : null
  }

  async editStatus(task, newStatus) {
    task.status = newStatus
    const res = await api.put('api/tasks/' + task.id, task)
  }

  async delete(id) {
    if (await Pop.confirm()) {
      try {
        const res = await api.delete('api/tasks/' + id)
        Pop.toast(res.data.message, 'success')
        AppState.tasks = AppState.tasks.filter(t => t.id !== id)
      } catch (error) {
        Pop.toast(error)
      }
    }
  }
}

export const tasksService = new TasksService()
