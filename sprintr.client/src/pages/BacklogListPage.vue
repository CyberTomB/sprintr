<template>
  <div id="backlog-list">
    <BacklogItemCard v-for="b in backlogItems" :key="b.id" :backlog-item="b" />
  </div>
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { backlogsService } from '../services/BacklogsService'
import { useRoute } from 'vue-router'
export default {
  setup() {
    const route = useRoute()
    onMounted(async() => {
      await backlogsService.getBacklogItemsByProjectId(route.params.project_id)
    })
    return {
      backlogItems: computed(() => AppState.backlogItems)
    }
  }
}
</script>
