<template>
  <div class="col">
    <div>
      <router-link :to="{name: 'Backlog', params: {project_id: project.id}}">
        <div>
          <h1>
            {{ project.name }}
          </h1>
        </div>
      </router-link>
      <i class="action mdi mdi-delete text-danger" @click="deleteProject(project.id)"></i>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { projectsService } from '../services/ProjectsService'

export default {
  setup() {
    return {
      account: computed(() => AppState.account),
      projects: computed(() => AppState.projects),
      async deleteProject(id) {
        await projectsService.delete(id)
      }
    }
  },
  props: {
    project: {
      type: Object,
      required: true
    }
  }
}

</script>

<style scoped>
i{
  font-size: 10vh;
}
</style>
