import { AppState } from '../AppState'
import Pop from '../utils/Notifier'
import { api } from './AxiosService'

class BacklogsService {
  async getBacklogItemsByProjectId(id) {
    const res = await api.get('api/projects/' + id + '/backlog')
    console.log(res.data)
    AppState.backlogItems = res.data
  }

  async create(newBacklogItem) {
    try {
      debugger
      const res = await api.post('api/backlog', newBacklogItem)
      Pop.toast('Backlog Created')
      console.log(res.data)
    } catch (error) {
      Pop.toast(error)
    }
  }
}

export const backlogsService = new BacklogsService()
