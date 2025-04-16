import { selectors } from "../support/selectors";

describe("Task Update", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("updates an existing task through the UI", () => {
    // Create a task first
    cy.get(selectors.CreateTaskButton.button).click();
    cy.get(selectors.TaskForm.container).within(() => {
      cy.get(selectors.TaskForm.titleInput).type("Original Task");
      cy.get(selectors.TaskForm.descriptionInput).type("Original description");
      cy.get(selectors.TaskForm.statusSelect).select("In Progress");
      cy.get(selectors.TaskForm.prioritySelect).select("High");
      cy.get(selectors.TaskForm.submitButton).click();
    });

    // Find the task in the list and click to edit
    cy.get(selectors.ListView.taskRow)
      .contains("Original Task")
      .parent()
      .find('[data-cy="edit-task-button"]')
      .click();

    // Update the task details
    cy.get(selectors.TaskForm.container).within(() => {
      cy.get(selectors.TaskForm.titleInput).clear().type("Updated Task");
      cy.get(selectors.TaskForm.descriptionInput).clear().type("Updated description");
      cy.get(selectors.TaskForm.statusSelect).select("Done");
      cy.get(selectors.TaskForm.prioritySelect).select("Low");
      cy.get(selectors.TaskForm.submitButton).click();
    });

    // Verify the task was updated in the list view
    cy.get(selectors.ListView.taskRow)
      .should("contain", "Updated Task")
      .and("contain", "Updated description")
      .and("contain", "Done")
      .and("contain", "Low");

    // Switch to Kanban view and verify the task is updated there as well
    cy.get(selectors.KanbanView.toggleButton).click();
    cy.get(selectors.KanbanView.taskCard)
      .should("contain", "Updated Task")
      .and("contain", "Updated description")
      .and("contain", "Done")
      .and("contain", "Low");
  });
});
