<template>
  <div id="backlog-list">
    <BacklogItemCard v-for="b in backlogItems" :key="b.id" :backlog-item="b" />
  </div>
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core'
import { AppState } from '../AppState'
import backlogsService from '../services/BacklogsService'
export default {
  name: 'Backlog',
  setup() {
    onMounted(async() => {
      await backlogsService.getByProjectId(id)
    })
    return {
      backlogItems: computed(() => AppState.backlogItems)
    }
  }
}
</script>
