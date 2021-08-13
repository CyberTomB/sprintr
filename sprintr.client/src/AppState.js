import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  account: {},
  projects: [],
  chosenProject: {},
  backlogItems: [],
  sprints: [{ id: 'sprint-test' }],
  chosenSprint: {},
  status: ['pending', 'in-progress', 'review', 'done'],
  tasks: [],
  notes: []
})
