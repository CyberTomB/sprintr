import { AppState } from '../AppState'
import { api } from './AxiosService'

class ProjectsService {
  async getAll() {
    const res = await api.get('projects')
    console.log(res.data)
    AppState.projects = res.data
  }
}

export const projectsService = new ProjectsService()
