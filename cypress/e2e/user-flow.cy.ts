describe("User Flow Test", () => {
  beforeEach(() => {
    // Visit the application before each test
    cy.visit("/");
  });

  it("adds and deletes a task", () => {
    // Verify list view is present
    cy.get('[data-cy="list-view"]').should("exist");
    // create a new task
    cy.get('[data-cy="create-task-button"]').click();
    // the task form should be visible
    cy.get('[data-cy="task-form"]')
      .should("exist")
      .within(() => {
        // fill in the task details
        cy.get('[data-cy="task-title"]').type("Test Task");
        cy.get('[data-cy="task-description"]').type("Test Description");
        cy.get('[data-cy="task-status"]').select("in progress");
        cy.get('[data-cy="task-priority"]').select("high");
        cy.get('[data-cy="submit-task-button"]').click();
      });

    // confirm the task was created and there is 1 task row in the list
    cy.get('[data-cy="task-row"]')
      .should("have.length", 1)
      .first()
      .within(() => {
        cy.get('[data-cy="task-title"]').should("have.text", "Test Task");
        cy.get('[data-cy="task-description"]').should("have.text", "Test Description");
        cy.get('[data-cy="task-status"]').should("have.text", "in progress");
        cy.get('[data-cy="task-priority"]').should("have.text", "high");
      });

    // delete the task
    cy.get('[data-cy="delete-task-button"]').click();
    // confirm the task was deleted
    cy.get('[data-cy="task-row"]').should("have.length", 0);
  });
});
