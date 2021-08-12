<template>
  <div class="col-4">
    <div class="card">
      <img class="card-img-top" src="holder.js/100x180/" alt="">
      <div class="card-body">
        <h4 class="card-title">
          <!-- {{ t.name }} -->
          Status
        </h4>
        <p class="card-text">
          Assign to:
        </p>
        <!-- <i class="action mdi mdi-delete text-danger" @click="deleteTask(t.id)"></i> -->
      </div>
    </div>
  </div>

  <!-- TODO: This is what a task object will look like. It must accept task objects as the prop from the BacklogItemDetailsPage to render the unique elements from each task. -->
  <!-- <h3>{{ task.name }}</h3> -->
</template>

<script>
// I hadn't written the props, so it was trying to reference a non-existent object as "task.name" but couldn't, which is why the page wasn't loading.
// NOTE: This is where the backlogitemcard knows to receive the prop "b" as an object from the BacklogListPage

import { computed, onMounted, reactive } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { tasksService } from '../services/TasksService'
import { useRoute } from 'vue-router'
export default {
  setup() {
    const route = useRoute()
    const state = reactive({
      newTask: {
        name: '',
        status: '',
        weight: '',
        projectId: route.params.project_id
      }
    })
    onMounted(async() => {
      await tasksService.getTasksByProjectId(route.params.project_id)
    })
    return {
      state,
      tasks: computed(() => AppState.tasks),
      async createTask() {
        console.log('created')
        await tasksService.create(state.newTask)
        state.newTask = { projectId: route.params.project_id }
      },
      async deleteTask(id) {
        await tasksService.delete(id)
      }
    }
  }
}

</script>
