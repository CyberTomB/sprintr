<template>
  <h1>{{ project.name }}</h1>
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState'
import { projectsService } from '../services/ProjectsService'
import Pop from '../utils/Notifier'
export default {
  setup() {
    const route = useRoute()
    onMounted(async() => {
      try {
        console.log(route.params.project_id)
        await projectsService.getProjectById(route.params.project_id)
      } catch (error) {
        Pop.toast(error)
      }
    })
    return {
      project: computed(() => AppState.projects)
    }
  }
}
</script>
