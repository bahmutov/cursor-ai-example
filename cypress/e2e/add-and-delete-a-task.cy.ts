it("adds and deletes a task", () => {
  // using the data-cy selectors from the src/ folder
  // visit the app
  cy.visit("/");

  // confirm the list-view is visible
  cy.get('[data-cy="list-view"]').should("be.visible");

  // click the create task button
  cy.get('[data-cy="create-task-button"]').click();

  // confirm the task form is visible
  cy.get('[data-cy="task-form"]').should("be.visible");

  // within the form:
  cy.get('[data-cy="task-form"]').within(() => {
    // enter a title
    cy.get('input[name="title"]').type("Test Task");

    // enter a description
    cy.get('textarea[name="description"]').type("This is a test task description");

    // select a status from the dropdown
    cy.get('[data-cy="status-select"]').select("In Progress");

    // select a priority from the dropdown
    cy.get('[data-cy="priority-select"]').select("High");

    // click the create task button
    cy.get('[data-cy="submit-task-button"]').click();
  });

  // confirm the task is visible in the list-view
  cy.get('[data-cy="task-row"]').should("contain", "Test Task");

  // click the delete button
  cy.get('[data-cy="delete-task-button"]').first().click();

  // confirm the task is no longer visible in the list-view
  cy.get('[data-cy="task-row"]').should("not.exist");
});
