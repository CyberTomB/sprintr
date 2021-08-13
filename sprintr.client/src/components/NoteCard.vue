<template>
  <div class="card mb-3 text-dark" style="max-width: 540px;" v-if="note.creator">
    <div class="row no-gutters">
      <div class="col-md-4 p-2">
        <img :src="note.creator.picture" :alt="note.creator.name" :title="note.creator.name">
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <p class="card-text">
            {{ note.body }}
          </p>
          <div class="card-text">
            <small class="text-darkgrey">Created By: {{ note.creator.name }}</small>
            <br>
            <small>{{ Date(note.createdAt) }}</small>
          </div>
          <DeleteBtn @delete="deleteNote(note.id)" :item-name="'note'" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { notesService } from '../services/NotesService'
export default {
  setup() {
    return {
      async deleteNote(id) {
        await notesService.delete(id)
      }
    }
  },
  props: {
    note: {
      type: Object,
      required: true
    }
  }
}
</script>
