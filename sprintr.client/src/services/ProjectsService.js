import { AppState } from '../AppState'
import Pop from '../utils/Notifier'
import { api } from './AxiosService'

class ProjectsService {
  async getAll() {
    try {
      const res = await api.get('api/projects')
      AppState.projects = res.data
    } catch (error) {
      Pop.toast(error)
    }
  }

  async getProjectById(id) {
    try {
      const res = await api.get('api/projects/' + id)
      AppState.chosenProject = res.data
    } catch (error) {
      Pop.toast(error)
    }
  }

  async create(newProject) {
    try {
      const res = await api.post('api/projects', newProject)
      AppState.projects.push(res.data)
      return res.data.id
    } catch (error) {
      Pop.toast(error)
    }
  }

  async delete(id) {
    if (await Pop.confirm()) {
      try {
        const res = await api.delete('api/projects/' + id)
        Pop.toast(res.data.message, 'success')
        AppState.projects = AppState.projects.filter(p => p.id !== id)
      } catch (error) {
        Pop.toast(error)
      }
    }
  }
}

export const projectsService = new ProjectsService()
