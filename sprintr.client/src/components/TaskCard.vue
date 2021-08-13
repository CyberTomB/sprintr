<template>
  <div class="card card-style">
    <div class="card-body">
      <div class="card-title title-style">
        <router-link :to="{name: 'TaskDetailsPage', params: {task_id: task.id}}" title="Task Details">
          <h4>
            {{ task.name }}
          </h4>
        </router-link>
      </div>
      <small class="mdi mdi-weight"> &nbsp; {{ task.weight }}</small>
      <div class="action">
        <p class="card-text " v-if="state.sprintSelectorOn">
          Sprint:
          <select v-model="state.selected" @change="assignToSprint">
            <option value="none">
              No Sprint
            </option>
            <option v-for="s in sprints" :key="s.id" :value="s.id">
              {{ s.name }}
            </option>
          </select>
        </p>
        <!-- TODO: Tasks should disappear if assigned to a different sprint -->
        <p v-else @click="changeSelectorOn('sprint')">
          Sprint:   <span v-if="state.sprintName">{{ state.sprintName }}</span>
          <span v-else><em>Assign Sprint</em></span>
        </p>
      </div>
      <div class="action">
        <p v-if="state.statusSelectorOn">
          Status: <select v-model="state.statusSelected" @change.stop="changeStatus">
            <option v-for="(s, index) in status" :key="index" :value="s">
              {{ s }}
            </option>
          </select>
        </p>
        <p v-else @click="changeSelectorOn('status')">
          Status: {{ task.status }}
        </p>
      </div>
      <DeleteBtn @delete="deleteTask(task.id)" :item-name="task.name" />
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
      sprintSelectorOn: false,
      statusSelectorOn: false,
      statusSelected: props.task.status,
      sprintName: props.task.sprint ? props.task.sprint.name : null
    })
    return {
      state,
      sprintNames: computed(() => AppState.sprints.map(function(sprint) {
        return sprint.name
      })),
      sprints: computed(() => AppState.sprints),
      status: computed(() => AppState.status),
      async assignToSprint() {
        if (state.selected === 'none') {
          state.selected = null
        }
        try {
          console.log('assigning')
          this.changeSelectorOn('sprint')
          const newSprintName = await tasksService.editSprint(props.task, state.selected)
          state.sprintName = newSprintName

          // location.reload()
          Pop.toast('success', 'success')
        } catch (error) {
          Pop.toast(error, 'error')
        }
      },
      async changeStatus() {
        try {
          console.log('status change')
          this.changeSelectorOn('status')
          await tasksService.editStatus(props.task, state.statusSelected)
          Pop.toast('Status Changed', 'success')
        } catch (error) {
          Pop.toast(error, 'error')
        }
      },
      async deleteTask(id) {
        await tasksService.delete(id)
      },
      changeSelectorOn(type) {
        if (type === 'status') { state.statusSelectorOn = !state.statusSelectorOn } else if (type === 'sprint') {
          state.sprintSelectorOn = !state.sprintSelectorOn
        }
      }

    }
  }
}
</script>

<style scoped>
.card-style{
  color:#000d2a;
}

</style>
