<template>
  <div class="row">
    <ProjectListComponent />
    <div class="col">
      <form @submit.prevent="createProject">
        <div class="form-group">
          <label for="project-name">Project Name</label>
          <input type="text"
                 class="form-control"
                 required
                 id="project-name"
                 aria-describedby="project-name"
                 v-model="state.newProject.name"
          >
        </div>
        <div class="form-group">
          <label for="project-description">Description</label>
          <textarea class="form-control" required id="project-description" v-model="state.newProject.description" />
        </div>
        <button type="submit" class="btn btn-primary">
          CREATE
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { projectsService } from '../services/ProjectsService'

export default {
  setup() {
    const router = useRouter()
    const state = {
      newProject: {
        name: '',
        description: ''
      }
    }
    return {
      state,
      async createProject() {
        console.log('ACK')
        const id = await projectsService.create(state.newProject)
        router.push({ name: 'Backlog', params: { project_id: id } })
      }
    }
  }
}
</script>
