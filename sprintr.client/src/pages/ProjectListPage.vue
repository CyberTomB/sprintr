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
import { projectsService } from '../services/ProjectsService'
// TODO: Create "Add New Project" button

export default {
  setup() {
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
        await projectsService.create(state.newProject)
      }
    }
  }
}
</script>
