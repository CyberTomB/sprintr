import { AppState } from '../AppState'
import { api } from './AxiosService'

class BacklogsService {
  async getBacklogItemsByProjectId(id) {
    const res = await api.get('api/projects/' + id + '/backlog')
    console.log(res.data)
    AppState.backlogItems = res.data
  }
}

export const backlogsService = new BacklogsService()
