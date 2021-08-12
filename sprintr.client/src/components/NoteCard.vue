<template>
  <div class="card mb-3" style="max-width: 540px;" v-if="note.creator">
    <div class="row no-gutters">
      <div class="col-md-4">
        <img :src="note.creator.picture" alt="...">
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">
            {{ note.creator.name }}
          </h5>
          <p class="card-text">
            {{ note.body }}
          </p>
          <p class="card-text">
            <small class="text-muted">Created At: {{ Date(note.createdAt) }}</small>
          </p>
          <i class="action mdi mdi-delete text-danger" @click="deleteNote(note.id)"></i>
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
