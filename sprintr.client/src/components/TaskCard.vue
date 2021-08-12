<template>
  <div class="card card-style">
    <div class="card-body">
      <div class="card-title">
        <h4>
          {{ task.name }}
        </h4>
        <small class="mdi mdi-weight"> | {{ task.weight }}</small>
      </div>
      <p class="card-text">
        Sprint:
        <select v-model="state.selected" @change="assignToSprint">
          <option v-for="s in sprints" :key="s.id" :value="s.id">
            {{ s.name }}
          </option>
        </select>
      </p>
      <div @click="changeStatusSelectorOn">
        <p v-if="state.statusSelectorOn">
          Status: <select v-model="state.statusSelected" @change="changeStatus">
            <option v-for="(s, index) in status" :key="index" :value="s">
              {{ s }}
            </option>
          </select>
        </p>
        <p v-else>
          Status: {{ task.status }}
        </p>
      </div>
      <i class="action mdi mdi-delete text-danger" @click="deleteTask(task.id)"></i>
    </div>
  </div>
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
      selected: props.task.sprintId,
      statusSelectorOn: false,
      statusSelected: props.task.status
    })
    return {
      state,
      sprints: computed(() => AppState.sprints),
      status: computed(() => AppState.status),
      async assignToSprint() {
        try {
          console.log('assigning')
          await tasksService.editSprint(props.task, state.selected)
          Pop.toast('success', 'success')
        } catch (error) {
          Pop.toast(error, 'error')
        }
      },
      async changeStatus() {
        try {
          console.log('status change')
          await tasksService.editStatus(props.task, state.statusSelected)
          Pop.toast('Status Changed', 'success')
        } catch (error) {
          Pop.toast(error, 'error')
        }
      },
      async deleteTask(id) {
        await tasksService.delete(id)
      },
      changeStatusSelectorOn() {
        state.statusSelectorOn = !state.statusSelectorOn
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
