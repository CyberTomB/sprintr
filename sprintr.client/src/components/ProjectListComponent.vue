<template>
  <div class="col">
    <div v-for="p in projects" :key="p.id">
      <router-link :to="{name: 'ChosenProject', params: {project_id: p.id}}">
        <div>
          <h1>
            {{ p.name }}
          </h1>
        </div>
      </router-link>
      <i class="action mdi mdi-delete text-danger" @click="deleteProject(p.id)"></i>
    </div>
  </div>
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
        await projectsService.getAll()
      } catch (error) {
        Pop.toast(error)
      }
    })
    return {
      account: computed(() => AppState.account),
      projects: computed(() => AppState.projects),
      async deleteProject(id) {
        await projectsService.delete(id)
      }
    }
  }
}

</script>

<style scoped>
i{
  font-size: 10vh;
}
</style>
