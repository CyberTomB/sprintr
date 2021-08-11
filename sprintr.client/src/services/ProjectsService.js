import { AppState } from '../AppState'
import { api } from './AxiosService'

class ProjectsService {
  async getAll() {
    const res = await api.get('api/projects')
    console.log('getAll', res.data)
    AppState.projects = res.data
  }

  async getProjectById(id) {
    console.log('api/projects/' + id)
    const res = await api.get('api/projects/' + id)
    console.log('getbyID', res)
    AppState.chosenProject = res.data
  }

  async create(rawProject) {
    const res = await api.create('api/projects')
  }
}

export const projectsService = new ProjectsService()
