import { AppState } from '../AppState'
import Pop from '../utils/Notifier'
import { api } from './AxiosService'

class BacklogsService {
  async getBacklogItemsByProjectId(id) {
    const res = await api.get('api/projects/' + id + '/backlog')
    AppState.backlogItems = res.data
  }

  async create(newBacklogItem) {
    try {
      const res = await api.post('api/backlog', newBacklogItem)
      Pop.toast('Backlog Created', 'success')
      AppState.backlogItems.push(res.data)
    } catch (error) {
      Pop.toast(error)
    }
  }

  async editIsOpen(backlogItem, openStatus) {
    backlogItem.isOpen = openStatus
    const res = await api.put('api/backlog/' + backlogItem.id, backlogItem)
  }

  async delete(id) {
    if (await Pop.confirm()) {
      try {
        const res = await api.delete('api/backlog/' + id)
        Pop.toast(res.data.message, 'success')
        AppState.backlogItems = AppState.backlogItems.filter(p => p.id !== id)
      } catch (error) {
        Pop.toast(error)
      }
    }
  }
}

export const backlogsService = new BacklogsService()
