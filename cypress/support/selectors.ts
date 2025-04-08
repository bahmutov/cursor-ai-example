export const selectors = {
  ListView: {
    container: '[data-cy="list-view"]',
    taskRow: '[data-cy="task-row"]',
  },
  TaskForm: {
    container: '[data-cy="task-form"]',
    titleInput: 'input[name="title"]',
    descriptionInput: 'textarea[name="description"]',
    statusSelect: '[data-cy="status-select"]',
    prioritySelect: '[data-cy="priority-select"]',
    submitButton: '[data-cy="submit-task-button"]',
  },
  CreateTaskButton: {
    button: '[data-cy="create-task-button"]',
  },
  DeleteTaskButton: {
    button: '[data-cy="delete-task-button"]',
  },
} as const;
