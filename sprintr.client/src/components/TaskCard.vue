<template>
  <div class="card card-style">
    <div class="card-body">
      <h4 class="card-title">
        {{ task.name }}
      </h4>
      <p class="card-text">
        <select v-model="state.selected" @change="assignToSprint">
          <option v-for="s in sprints" :key="s.id" :value="s.id">
            {{ s.name }}
          </option>
        </select>
        Sprint:
      </p>
      <p>Status: {{ task.status }}</p>
      <i class="action mdi mdi-delete text-danger" @click="deleteTask(task.id)"></i>
    </div>
  </div>

  <!-- TODO: This is what a task object will look like. It must accept task objects as the prop from the BacklogItemDetailsPage to render the unique elements from each task. -->
  <!-- <h3>{{ task.name }}</h3> -->
</template>

<script>
import { computed, reactive } from '@vue/runtime-core'
import { AppState } from '../AppState'
import Pop from '../utils/Notifier'
import { tasksService } from '../services/TasksService'
// I hadn't written the props, so it was trying to reference a non-existent object as "task.name" but couldn't, which is why the page wasn't loading.
// NOTE: This is where the backlogitemcard knows to receive the prop "b" as an object from the BacklogListPage
export default {
  props: {
    task: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const state = reactive({
      selected: props.task.sprintId
    })
    return {
      state,
      sprints: computed(() => AppState.sprints),

      async assignToSprint() {
        try {
          console.log('assigning')
          await tasksService.edit(props.task, state.selected)
          Pop.toast('success', 'success')
        } catch (error) {
          Pop.toast(error, 'error')
        }
      },
      async deleteTask(id) {
        await tasksService.delete(id)
      }

    }
  }
}
</script>

<style scoped>
.card-style{
  color:#000d2a;
}

.font-style{
}

</style>
