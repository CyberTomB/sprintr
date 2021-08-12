<template>
  <div class="col-12">
    <h1 v-if="backlog" class="pb-3">
      {{ backlog.name }}
      <small v-if="backlogTaskWeight">Weight: {{ backlogTaskWeight }} Completed: {{ tasksDone.length }} / {{ tasks.length }}</small>
    </h1>
  </div>
  <div class="col-7">
    <div class="card-columns d-flex">
      <TaskCard v-for="t in tasks" :key="t.id" :task="t" />
    </div>
  </div>
  <div class="col-4">
    <form @submit.prevent="createTask">
      <div class="form-group">
        <label for="task-name">Task Name</label>
        <input type="text"
               class="form-control"
               required
               id="task-name"
               aria-describedby="task-name"
               v-model="state.newTask.name"
        >
        <!-- NOTE Form for Task weight -->
      </div>
      <div class="form-group">
        <label for="task-weight">Task Weight:</label>
        <select class="form-control" required id="task-weight" v-model="state.newTask.weight">
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </select>
      </div>
      <!-- NOTE Form for Task Status -->
      <div class="form-group">
        <label for="task-status">Task Status:</label>
        <select class="form-control" required id="task-status" v-model="state.newTask.status">
          <option>pending</option>
          <option>in-progress</option>
          <option>review</option>
          <option>done</option>
        </select>
      </div>

      <button type="submit" class="btn btn-primary">
        CREATE
      </button>
    </form>
  </div>
</template>

<script>
import { useRoute, useRouter } from 'vue-router'
import { computed, onMounted } from '@vue/runtime-core'
import Pop from '../utils/Notifier'
import { tasksService } from '../services/TasksService'
import { AppState } from '../AppState'

export default {
  setup() {
    const router = useRouter()
    // Make sure the "useRoute" function is being imported, assign it to const "route" if you want to use it like this
    const route = useRoute()
    const state = {
      newTask: {
        name: '',
        weight: '',
        status: '',
        projectId: route.params.project_id,
        backlogItemId: route.params.backlog_id
      }
    }
    onMounted(async() => {
      try {
        await tasksService.getAllTasks('backlog', route.params.backlog_id)
      } catch (error) {
        Pop.toast(error)
      }
    })
    return {
      state,
      async createTask() {
        console.log('TASKACK')
        state.newTask.weight = Number(state.newTask.weight)
        const id = await tasksService.create(state.newTask)
        state.newTask = {
          projectId: route.params.project_id,
          backlogItemId: route.params.backlog_id
        }
      },
      backlog: computed(() => AppState.backlogItems.find(b => b.id === route.params.backlog_id)),
      tasks: computed(() => AppState.tasks),
      tasksDone: computed(() => AppState.tasks.filter(t => t.status === 'done')),
      backlogTaskWeight: computed(() => {
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
