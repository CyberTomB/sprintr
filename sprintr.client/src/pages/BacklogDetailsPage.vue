<template>
  <h1>TASKS GO HERE</h1>
  <!-- <TaskCard /> -->
</template>

<script>
import { onMounted } from '@vue/runtime-core'
import Pop from '../utils/Notifier'
import { tasksService } from '../services/TasksService'
import { useRoute } from 'vue-router'
export default {
  setup() {
    const route = useRoute()
    onMounted(async() => {
      try {
        await tasksService.getAllTasks(route.params.backlog_id)
      } catch (error) {
        Pop.toast(error)
      }
    })
  }
}
</script>
