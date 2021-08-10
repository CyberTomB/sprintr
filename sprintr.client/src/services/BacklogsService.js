const { api } = require('./AxiosService')

class BacklogsService {
  async getByProjectId(id) {
    const res = await api.get('projects/' + id + '/backlogitems')
    console.log(res.data)
  }
}

export const backlogsService = new BacklogsService()
