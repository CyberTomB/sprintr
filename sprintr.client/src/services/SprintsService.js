import { AppState } from '../AppState'
import Pop from '../utils/Notifier'
import { api } from './AxiosService'

class SprintsService {
  async getSprintsByProjectId(id) {
    try {
      const res = await api.get('api/projects/' + id + '/sprints')
      console.log(res.data)
      AppState.sprints = res.data
    } catch (error) {
      Pop.toast(error)
    }
  }

  async create(newSprint) {
    try {
      const res = await api.post('api/sprints', newSprint)
      Pop.toast('Sprint Created', 'success')
      AppState.sprints.push(res.data)
      console.log('new sprint', res.data)
    } catch (error) {
      Pop.toast(error)
    }
  }

  async delete(id) {
    if (await Pop.confirm()) {
      try {
        const res = await api.delete('api/sprints/' + id)
        Pop.toast(res.data.message, 'success')
        AppState.sprints = AppState.sprints.filter(s => s.id !== id)
      } catch (error) {
        Pop.toast(error)
      }
    }
  }
}

export const sprintsService = new SprintsService()
