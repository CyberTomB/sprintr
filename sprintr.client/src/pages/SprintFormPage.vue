<template>
  <form class="col-5" @submit.prevent="createSprint">
    <div class="form-group">
      <label for="sprint-name">Sprint Name:</label>
      <input type="text"
             class="form-control"
             required
             id="sprint-name"
             aria-describedby="sprint-name"
             v-model="state.newSprint.name"
      >
    </div>
    <div class="form-group">
      <label for="sprint-start-date">Start Date:</label>
      <input type="date"
             class="form-control"
             required
             id="sprint-start-date"
             aria-describedby="sprint-start-date"
             v-model="state.newSprint.startDate"
      >
    </div>
    <div class="form-group">
      <label for="sprint-end-date">End Date:</label>
      <input type="date"
             class="form-control"
             required
             id="sprint-end-date"
             aria-describedby="sprint-end-date"
             v-model="state.newSprint.endDate"
      >
    </div>
    <button type="submit" class="btn btn-success">
      ADD
    </button>
  </form>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { sprintsService } from '../services/SprintsService'
import { useRoute } from 'vue-router'
export default {
  setup() {
    const route = useRoute()
    const state = reactive({
      newSprint: {
        name: '',
        startDate: '',
        endDate: '',
        isOpen: true,
        projectId: route.params.project_id
      }
    })
    return {
      state,
      async createSprint() {
        await sprintsService.create(state.newSprint)
        state.newSprint = {
          projectId: route.params.project_id, isOpen: true
        }
      }
    }
  }
}
</script>
