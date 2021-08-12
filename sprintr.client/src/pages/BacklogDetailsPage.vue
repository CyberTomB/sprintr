<template>
  <div class="row">
    <h1>TASKS GO HERE</h1>
    <TaskCard />
    <div class="col">
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
          NOTE Form for Task weight
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
        NOTE Form for Task Status
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
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { onMounted } from '@vue/runtime-core'
import Pop from '../utils/Notifier'
import { tasksService } from '../services/TasksService'

export default {
  setup() {
    const router = useRouter()
    const state = {
      newTask: {
        name: '',
        weight: '',
        status: ''
      }
    }
    onMounted(async() => {
      try {
        await tasksService.getAllTasks(route.params.backlog_id)
      } catch (error) {
        Pop.toast(error)
      }
    })
    return {
      state,
      async createTask() {
        console.log('TASKACK')
        const id = await tasksService.create(state.newTask)
        router.push({ name: 'BacklogDetailsPage', params: { backlog_id: id } })
      }
    }
  }
}
</script>
