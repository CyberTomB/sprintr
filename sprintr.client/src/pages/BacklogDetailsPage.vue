<template>
  <h1>TASKS GO HERE</h1>
  <TaskCard />
</template>

<script>
import { onMounted } from '@vue/runtime-core'
import Pop from '../utils/Notifier'
import { tasksService } from '../services/TasksService'
export default {
  setup() {
    onMounted(async() => {
      try {
        await tasksService.getAllTasks()
      } catch (error) {
        Pop.toast(error)
      }
    })
  }
}
</script>
