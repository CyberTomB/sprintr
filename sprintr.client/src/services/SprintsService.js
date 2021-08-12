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
}

export const sprintsService = new SprintsService()
