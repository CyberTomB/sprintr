<template>
  <div v-if="sprint" class="col-12">
    <div class="row">
      <h1>
        {{ sprint.name }}:
        <small>Tasks: {{ tasksDone.length }} / {{ tasks.length }} | Weight: {{ sprintTaskWeight }}</small>
      </h1>
    </div>
    <div class="row">
      <div>
        <button class="btn btn-danger" @click="deleteSprint">
          DELETE
        </button>
      </div>
    </div>
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
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { useRoute, useRouter } from 'vue-router'
import { sprintsService } from '../services/SprintsService'
import { tasksService } from '../services/TasksService'
import Pop from '../utils/Notifier'
export default {
  setup() {
    onMounted(async() => {
      try {
        await tasksService.getAllTasks(route.params.sprint_id)
      } catch (error) {
        Pop.toast(error)
      }
    })
    const route = useRoute()
    const router = useRouter()
    return {
      sprint: computed(() => AppState.sprints.find(s => s.id === route.params.sprint_id)),
      async deleteSprint() {
        await sprintsService.delete(route.params.sprint_id)
        router.push({ name: 'Backlog' })
      },
      tasks: computed(() => AppState.tasks),
      tasksDone: computed(() => AppState.tasks.filter(t => t.status === 'done')),
      sprintTaskWeight: computed(() => {
        let total = 0
        AppState.tasks.forEach(t => {
          total += t.weight
        })
        return total
      })
    }
  }
}
</script>
