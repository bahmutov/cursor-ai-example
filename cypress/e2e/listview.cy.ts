import { TaskStatus, TaskPriority } from "../../src/types";

describe("ListView", () => {
  beforeEach(() => {
    // Visit the app and ensure we're in list view
    cy.visit("/");
    cy.get('[data-cy="list-view"]').should("exist");
  });

  it("should display tasks in a table format", () => {
    // Check if the table headers are present
    cy.get('[data-cy="task-title-header"]').should("be.visible");
    cy.get('[data-cy="task-status-header"]').should("be.visible");
    cy.get('[data-cy="task-priority-header"]').should("be.visible");
    cy.get('[data-cy="task-updated-header"]').should("be.visible");
  });

  it("should allow sorting tasks by different columns", () => {
    // Test sorting by title
    cy.get('[data-cy="task-title-header"]').click();
    cy.get('[data-cy="task-title-header"]').should("contain", "↑");
    cy.get('[data-cy="task-title-header"]').click();
    cy.get('[data-cy="task-title-header"]').should("contain", "↓");

    // Test sorting by status
    cy.get('[data-cy="task-status-header"]').click();
    cy.get('[data-cy="task-status-header"]').should("contain", "↑");
  });

  it("should allow selecting and bulk deleting tasks", () => {
    // Select first task
    cy.get("tbody tr").first().find('input[type="checkbox"]').check();

    // Verify selection count
    cy.get('[data-cy="selected-tasks"]').should("contain", "1 task selected");

    // Select all tasks
    cy.get('[data-cy="select-all"]').check();

    // Verify all tasks are selected
    cy.get('tbody tr input[type="checkbox"]').should("be.checked");

    // Test bulk delete
    cy.get('[data-cy="delete-selected-button"]').click();
    cy.on("window:confirm", () => true);
  });

  it("should handle pagination correctly", () => {
    // Create more than 10 tasks to test pagination
    for (let i = 0; i < 15; i++) {
      cy.get('[data-cy="add-task-button"]').click();
      cy.get('[data-cy="task-title-input"]').type(`Test Task ${i}`);
      cy.get('[data-cy="save-task-button"]').click();
    }

    // Verify pagination controls
    cy.get('[data-cy="pagination"]').should("exist");

    // Test page navigation
    cy.get('[data-cy="next-page"]').click();
    cy.get("tbody tr").should("have.length", 5); // 15 total tasks - 10 per page = 5 on second page
  });

  it("should filter tasks by status and priority", () => {
    // Create tasks with different statuses and priorities
    const statuses: TaskStatus[] = ["not started", "in progress", "completed"];
    const priorities: TaskPriority[] = ["none", "low", "medium", "high", "urgent"];

    statuses.forEach(status => {
      priorities.forEach(priority => {
        cy.get('[data-cy="add-task-button"]').click();
        cy.get('[data-cy="task-title-input"]').type(`${status} ${priority} task`);
        cy.get('[data-cy="task-status-select"]').select(status);
        cy.get('[data-cy="task-priority-select"]').select(priority);
        cy.get('[data-cy="save-task-button"]').click();
      });
    });

    // Test status filter
    cy.get('[data-cy="status-filter"]').select("completed");
    cy.get("tbody tr").each($row => {
      cy.wrap($row).find('[data-cy="task-status"]').should("contain", "completed");
    });

    // Test priority filter
    cy.get('[data-cy="priority-filter"]').select("urgent");
    cy.get("tbody tr").each($row => {
      cy.wrap($row).find('[data-cy="task-priority"]').should("contain", "urgent");
    });
  });

  it("should search tasks by title", () => {
    // Create some test tasks
    const tasks = ["Important Task", "Regular Task", "Critical Task"];
    tasks.forEach(task => {
      cy.get('[data-cy="add-task-button"]').click();
      cy.get('[data-cy="task-title-input"]').type(task);
      cy.get('[data-cy="save-task-button"]').click();
    });

    // Test search functionality
    cy.get('[data-cy="search-input"]').type("Important");
    cy.get("tbody tr").should("have.length", 1);
    cy.get("tbody tr").first().should("contain", "Important Task");
  });
});
