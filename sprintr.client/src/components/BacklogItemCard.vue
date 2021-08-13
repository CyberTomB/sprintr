<template>
  <div class="card p-2 my-2">
    <div class="row justify-content-between align-items-end">
      <router-link :to="{name: 'BacklogItemDetailsPage', params: {backlog_id: backlogItem.id}}" class="col-8" title="Backlog Details">
        <h2>
          {{ backlogItem.name }}
        </h2>
      </router-link>
      <div class="col-4 text-right">
        <!-- NOTE: the class is bound to the state "isOpen" property, which is a bool. Then supplies a string from the state as needed. -->
        <i class="mx-2 mdi btn" :class="[state.isOpen ? state.openClass : state.closedClass]" @click="changeOpen" :title="state.isOpen? 'Open' : 'Closed'">
        </i>
        <DeleteBtn @delete="deleteProject(backlogItem.id)" :item-name="backlogItem.name" />
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { backlogsService } from '../services/BacklogsService'
import Pop from '../utils/Notifier'
export default {
  // NOTE: This is where the backlogitemcard knows to receive the prop "b" as an object from the BacklogListPage
  setup(props) {
    const state = reactive({
      isOpen: props.backlogItem.isOpen,
      openClass: 'btn-success mdi-progress-check',
      closedClass: 'btn-dark mdi-checkbox-marked-circle'
    })
    return {
      state,
      async deleteProject(id) {
        await backlogsService.delete(id)
      },
      async changeOpen() {
        try {
          state.isOpen = !state.isOpen
          await backlogsService.editIsOpen(props.backlogItem, state.isOpen)
          Pop.toast('Status Changed', 'success')
        } catch (error) {
          Pop.toast(error, 'error')
        }
      }
    }
  },
  props: {
    backlogItem: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
