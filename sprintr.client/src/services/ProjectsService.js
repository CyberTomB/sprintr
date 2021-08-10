import { AppState } from '../AppState'
import { api } from './AxiosService'

class ProjectsService {
  async getAll() {
    const res = await api.get('projects')
    AppState.projects = res.data
  }
}

export const projectsService = new ProjectsService()
