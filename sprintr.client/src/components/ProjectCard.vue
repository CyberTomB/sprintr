<template>
  <div class="card p-2 my-2">
    <div class="row justify-content-between align-items-end">
      <router-link :to="{name: 'Backlog', params: {project_id: project.id}}" class="col-8" :title="project.name + ' Backlog'">
        <h1>
          {{ project.name }}
        </h1>
      </router-link>
      <div class="col-4 text-right">
        <DeleteBtn @delete="deleteProject(project.id)" :item-name="project.name" />
      </div>
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
  font-size: 5vh;
}
</style>
