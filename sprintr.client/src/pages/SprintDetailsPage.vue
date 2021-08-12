<template>
  <div class="col-12">
    <div v-if="sprint">
      <h4>{{ sprint.name }}</h4>
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
import { useRoute } from 'vue-router'
export default {
  setup() {
    const route = useRoute()
    // REVIEW: How best to make it load on page refresh?
    return { sprint: computed(() => AppState.sprints.find(s => s.id === route.params.sprint_id)) }
  }
}
</script>
