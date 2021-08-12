<template>
  <form>
    <div class="form-group">
      <label for="sprint-name">Sprint Name:</label>
      <input type="text" class="form-control" required id="sprint-name" aria-describedby="sprint-name">
    </div>
    <div class="form-group">
      <label for="sprint-start-date">Start Date:</label>
      <input type="date" class="form-control" required id="sprint-start-date" aria-describedby="sprint-start-date">
    </div>
    <div class="form-group">
      <label for="sprint-end-date">End Date:</label>
      <input type="date" class="form-control" required id="sprint-end-date" aria-describedby="sprint-end-date">
    </div>
    <div class="form-group">
      <label for="sprint-is-open">Open:</label>
      <input type="checkbox" class="form-control" required id="sprint-is-open" aria-describedby="sprint-is-open">
    </div>
    <button type="submit" class="btn btn-success">
      ADD
    </button>
  </form>
</template>
