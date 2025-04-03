describe("User Flow Test", () => {
  beforeEach(() => {
    // Visit the application before each test
    cy.visit("/");
  });

  it("should interact with all list view elements", () => {
    // Verify list view is present
    cy.get('[data-cy="list-view"]').should("exist");

    // Test task selection functionality
    cy.get('[data-cy="select-all"]').should("exist");
    cy.get('[data-cy="select-task"]').should("exist");

    // Test column headers and sorting
    cy.get('[data-cy="task-title-header"]').should("exist").click();
    cy.get('[data-cy="task-status-header"]').should("exist").click();
    cy.get('[data-cy="task-priority-header"]').should("exist").click();
    cy.get('[data-cy="task-updated-header"]').should("exist").click();

    // Test task row elements
    cy.get('[data-cy="tasks"]').should("exist");
    cy.get('[data-cy="task-row"]').should("exist");
    cy.get('[data-cy="task-title"]').should("exist");
    cy.get('[data-cy="task-description"]').should("exist");
    cy.get('[data-cy="task-status"]').should("exist");
    cy.get('[data-cy="task-priority"]').should("exist");
    cy.get('[data-cy="task-updated"]').should("exist");

    // Test task actions
    cy.get('[data-cy="edit-task-button"]').should("exist");
    cy.get('[data-cy="delete-task-button"]').should("exist");

    // Test bulk actions
    cy.get('[data-cy="selected-tasks"]').should("exist");
    cy.get('[data-cy="delete-selected-button"]').should("exist");

    // Test pagination elements
    cy.get('[data-cy="mobile-pagination"]').should("exist");
    cy.get('[data-cy="desktop-pagination"]').should("exist");
    cy.get('[data-cy="pagination-info"]').should("exist");
    cy.get('[data-cy="pagination-prev-button"]').should("exist");
    cy.get('[data-cy="pagination-next-button"]').should("exist");
    cy.get('[data-cy="pagination-first-button"]').should("exist");
    cy.get('[data-cy="pagination-last-button"]').should("exist");

    // Test pagination page buttons (check first 5 pages)
    for (let i = 1; i <= 5; i++) {
      cy.get(`[data-cy="pagination-page-${i}-button"]`).should("exist");
    }

    // Test zero tasks state
    cy.get('[data-cy="zero-tasks"]').should("exist");
  });
});
