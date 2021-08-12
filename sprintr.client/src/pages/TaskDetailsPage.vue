<template>
  <div class="col-6">
    <!-- Notes for the Task load here  -->
    <NoteCard />
  </div>
  <div class="col-6">
    <form @submit.prevent="createNote">
      <div class="form-group">
        <label for="note"></label>
        <textarea name="note" id="new-note-textarea" cols="30" rows="10" v-model="state.newNote.body"></textarea>
      </div>
      <button type="submit" class="btn btn-success">
        ADD NOTE
      </button>
    </form>
  </div>
</template>

<script>
import { onMounted, reactive } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import { notesService } from '../services/NotesService'
import Pop from '../utils/Notifier'
export default {
  setup() {
    const route = useRoute()
    const state = reactive({
      newNote: {
        body: '',
        taskId: route.params.task_id
      }
    })
    onMounted(async() => {
      try {
        await notesService.getAllNotesByTaskId(route.params.task_id)
      } catch (error) {
        Pop.toast(error)
      }
    })
    return {
      state,
      async createNote() {
        await notesService.create(state.newNote)
        state.newNote = {
          taskId: route.params.task_id
        }
      }
    }
  }
}
</script>
