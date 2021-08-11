<template>
  <div class="row">
    <ProjectListComponent />
    <div class="col">
      <form @submit.prevent="createProject">
        <div class="form-group">
          <label for="project-name">Project Name</label>
          <input type="text" class="form-control" id="project-name" aria-describedby="project-name">
        </div>
        <div class="form-group">
          <label for="project-description">Description</label>
          <textarea class="form-control" id="project-description" />
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
    return {
      async createProject() {
        console.log('ACK')
        await projectsService.create()
      }
    }
  }
}
</script>
