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
      const res = await api.post('api/backlog', newBacklogItem)
      Pop.toast('Backlog Created')
      console.log(res.data)
    } catch (error) {
      Pop.toast(error)
    }
  }

  async delete(id) {
    if (await Pop.confirm()) {
      try {
        const res = await api.delete('api/backlog/' + id)
        Pop.toast(res.data.message)
        AppState.backlogItems = AppState.backlogItems.filter(p => p.id !== id)
      } catch (error) {
        Pop.toast(error)
      }
    }
  }
}

export const backlogsService = new BacklogsService()
