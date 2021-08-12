<template>
  <div class="col-12">
    <div v-if="sprint">
      <h4>{{ sprint.name }}</h4>
      <button class="btn btn-danger" @click="deleteSprint">
        DELETE
      </button>
    </div>
    <div v-else class="card p-2 skeleton-loader bg-dark">
      <div class="card-title p-2">
        <div class="d-flex align-items-center">
          <div class="skeleton-loader avatar"></div>
          <div class="skeleton-loader text mx-2"></div>
        </div>
      </div>
      <div class="card-body border-top">
        <div class="skeleton-loader text block"></div>
        <div class="skeleton-loader text block"></div>
        <div class="skeleton-loader text"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { useRoute, useRouter } from 'vue-router'
import { sprintsService } from '../services/SprintsService'
export default {
  setup() {
    const route = useRoute()
    const router = useRouter()
    return {
      sprint: computed(() => AppState.sprints.find(s => s.id === route.params.sprint_id)),
      async deleteSprint() {
        await sprintsService.delete(route.params.sprint_id)
        router.push({ name: 'Backlog' })
      }
    }
  }
}
</script>
