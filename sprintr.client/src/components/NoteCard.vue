<template>
  <div class="card mb-3" style="max-width: 540px;">
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    note: {
      type: Object,
      required: true
    }
  }
}
</script>
