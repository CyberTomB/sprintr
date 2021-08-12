<template>
  <h4>{{ sprint.name }}</h4>
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core'
import { AppState } from '../AppState'
export default {
  setup() {
    // REVIEW: How best to make it load on page refresh?
    return { sprint: computed(() => AppState.chosenSprint) }
  }
}
</script>
