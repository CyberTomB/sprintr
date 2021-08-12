<template>
  <h1 @click="projectListPage" class="action">
    {{ project.name }}
  </h1>
  <div class="row">
    <router-view></router-view>
  </div>
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core'
import { useRoute, useRouter } from 'vue-router'
import { AppState } from '../AppState'
import { projectsService } from '../services/ProjectsService'
import Pop from '../utils/Notifier'
import { backlogsService } from '../services/BacklogsService'
export default {
  setup() {
    const route = useRoute()
    const router = useRouter()
    onMounted(async() => {
      try {
        console.log(route.params.project_id)
        await projectsService.getProjectById(route.params.project_id)
        // await backlogsService.getBacklogItemsByProjectId(route.params.project_id)
      } catch (error) {
        Pop.toast(error)
      }
    })
    return {
      project: computed(() => AppState.chosenProject),
      projectListPage() {
        router.push({ name: 'ProjectList' })
      }
    }
  }
}
</script>
