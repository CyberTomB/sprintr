<template>
  <h1>{{ projects[0].name }}</h1>
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState'
import Pop from '../utils/Notifier'
import { projectsService } from '../services/ProjectsService'

export default {
  setup() {
    const route = useRoute()
    onMounted(async() => {
      try {
        if (route.name === 'Home') { await projectsService.getAll() }
      } catch (error) {
        Pop.toast(error)
      }
    })
    return {
      account: computed(() => AppState.account),
      projects: computed(() => AppState.projects)
    }
  }
}
</script>
