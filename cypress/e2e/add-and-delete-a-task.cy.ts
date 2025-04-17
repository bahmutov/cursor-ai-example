import { selectors } from "../support/selectors";

it("adds and deletes a task", () => {
  // using the data-cy selectors from the src/ folder
  // visit the app
  cy.visit("/");

  // confirm the list-view is visible
  cy.get(selectors.ListView.container).should("be.visible");

  // click the create task button
  cy.get(selectors.CreateTaskButton.button).click();

  // confirm the task form is visible
  cy.get(selectors.TaskForm.container).should("be.visible");

  // within the form:
  cy.get(selectors.TaskForm.container).within(() => {
    // enter a title
    cy.get(selectors.TaskForm.titleInput).type("Test Task");

    // enter a description
    cy.get(selectors.TaskForm.descriptionInput).type("This is a test task description");

    // select a status from the dropdown
    cy.get(selectors.TaskForm.statusSelect).select("In Progress");

    // select a priority from the dropdown
    cy.get(selectors.TaskForm.prioritySelect).select("High");

    // click the create task button
    cy.get(selectors.TaskForm.submitButton).click();
  });

  // confirm the task is visible in the list-view
  cy.get(selectors.ListView.taskRow).should("contain", "Test Task");

  // click the delete button
  cy.get(selectors.DeleteTaskButton.button).first().click();

  // confirm the task is no longer visible in the list-view
  cy.get(selectors.ListView.taskRow).should("not.exist");
});
