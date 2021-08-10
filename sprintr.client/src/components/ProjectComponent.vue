<template>
  <h1 v-for="p in projects" :key="p.id">
    {{ p.name }}
  </h1>
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
        if (route.name === 'Account') { await projectsService.getAll() }
      } catch (error) {
        Pop.toast(error)
      }
    })
    return {
      account: computed(() => AppState.account),
      projects: computed(() => AppState.projects),
      async getAll() {
        await projectsService.getAll()
      }
    }
  }
}

</script>
