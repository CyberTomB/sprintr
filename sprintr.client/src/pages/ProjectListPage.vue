<template>
  <div class="row justify-content-around">
    <div class="col-6" v-if="projects[0]">
      <ProjectCard v-for="p in projects" :key="p.id" :project="p" />
    </div>
    <div v-else class="col-6">
      <LoaderComponent />
    </div>
    <div class="col-5" id="new-project-form">
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
import { computed, onMounted } from '@vue/runtime-core'
import { useRouter } from 'vue-router'
import { AppState } from '../AppState'
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
    onMounted(async() => {
      try {
        await projectsService.getAll()
      } catch (error) {
        Pop.toast(error)
      }
    })
    return {
      state,
      async createProject() {
        console.log('ACK')
        const id = await projectsService.create(state.newProject)
        router.push({ name: 'Backlog', params: { project_id: id } })
      },
      projects: computed(() => AppState.projects)
    }
  }
}
</script>
