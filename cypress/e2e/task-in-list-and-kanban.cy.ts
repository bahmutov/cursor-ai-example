import { selectors } from "../support/selectors";

it("shows the task in the list view and kanban view", () => {
  // visit the app
  cy.visit("/");

  // verify the List view is visible
  cy.get(selectors.ListView.container).should("be.visible");

  // create a task
  cy.get(selectors.CreateTaskButton.button).click();
  cy.get(selectors.TaskForm.container).within(() => {
    cy.get(selectors.TaskForm.titleInput).type("Test Task");
    cy.get(selectors.TaskForm.descriptionInput).type("This is a test task description");
    cy.get(selectors.TaskForm.statusSelect).select("In Progress");
    cy.get(selectors.TaskForm.prioritySelect).select("High");
    cy.get(selectors.TaskForm.submitButton).click();
  });

  // confirm the task is shown in the List view
  cy.get(selectors.ListView.taskRow).should("contain", "Test Task");

  // click on the "Kanban" button
  cy.get(selectors.KanbanView.toggleButton).click();

  // confirm the Kanban view is visible
  cy.get(selectors.KanbanView.container).should("be.visible");

  // confirm the task is shown in the Kanban view
  cy.get(selectors.KanbanView.taskCard).should("contain", "Test Task");
});
