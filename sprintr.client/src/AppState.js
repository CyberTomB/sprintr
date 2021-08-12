import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  account: {},
  projects: [{ name: 'test' }],
  chosenProject: {},
  backlogItems: [{ name: 'backlog-test' }],
  sprints: [{ id: 'sprint-test' }],
  chosenSprint: {},
  status: ['pending', 'in-progress', 'review', 'done'],
  tasks: [],
  notes: []
})
