import { Task } from "../../src/types";

describe("Task Selection", () => {
  beforeEach(() => {
    // Reset the database and visit the list view
    cy.visit("/");
  });

  it("should toggle individual task selection", () => {
    // Create a test task
    const testTask: Task = {
      id: "test-task-1",
      title: "Test Task 1",
      description: "Test Description",
      status: "not started",
      priority: "medium",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Add the task to the list
    cy.get('[data-cy="task-row"]').should("not.exist");
    cy.get('[data-cy="add-task-button"]').click();
    cy.get('[data-cy="task-form"]').within(() => {
      cy.get('[data-cy="task-title-input"]').type(testTask.title);
      cy.get('[data-cy="task-description-input"]').type(testTask.description);
      cy.get('[data-cy="task-submit-button"]').click();
    });

    // Verify task is added
    cy.get('[data-cy="task-row"]').should("exist");

    // Test task selection
    cy.get('[data-cy="select-task"]').should("not.be.checked");
    cy.get('[data-cy="select-task"]').click();
    cy.get('[data-cy="select-task"]').should("be.checked");
    cy.get('[data-cy="selected-tasks"]').should("contain", "1 task selected");

    // Test task deselection
    cy.get('[data-cy="select-task"]').click();
    cy.get('[data-cy="select-task"]').should("not.be.checked");
    cy.get('[data-cy="selected-tasks"]').should("not.exist");
  });

  it("should handle multiple task selections", () => {
    // Create multiple test tasks
    const tasks = [
      {
        id: "test-task-1",
        title: "Test Task 1",
        description: "Test Description 1",
        status: "not started",
        priority: "medium",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        customFields: {},
      },
      {
        id: "test-task-2",
        title: "Test Task 2",
        description: "Test Description 2",
        status: "in progress",
        priority: "high",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        customFields: {},
      },
    ];

    // Add multiple tasks
    tasks.forEach(task => {
      cy.get('[data-cy="add-task-button"]').click();
      cy.get('[data-cy="task-form"]').within(() => {
        cy.get('[data-cy="task-title-input"]').type(task.title);
        cy.get('[data-cy="task-description-input"]').type(task.description);
        cy.get('[data-cy="task-submit-button"]').click();
      });
    });

    // Verify multiple tasks are added
    cy.get('[data-cy="task-row"]').should("have.length", 2);

    // Select all tasks
    cy.get('[data-cy="select-all"]').click();
    cy.get('[data-cy="select-task"]').each($checkbox => {
      cy.wrap($checkbox).should("be.checked");
    });
    cy.get('[data-cy="selected-tasks"]').should("contain", "2 tasks selected");

    // Deselect all tasks
    cy.get('[data-cy="select-all"]').click();
    cy.get('[data-cy="select-task"]').each($checkbox => {
      cy.wrap($checkbox).should("not.be.checked");
    });
    cy.get('[data-cy="selected-tasks"]').should("not.exist");
  });

  it("should maintain selection state after page refresh", () => {
    // Create a test task
    const testTask: Task = {
      id: "test-task-1",
      title: "Test Task 1",
      description: "Test Description",
      status: "not started",
      priority: "medium",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      customFields: {},
    };

    // Add the task
    cy.get('[data-cy="add-task-button"]').click();
    cy.get('[data-cy="task-form"]').within(() => {
      cy.get('[data-cy="task-title-input"]').type(testTask.title);
      cy.get('[data-cy="task-description-input"]').type(testTask.description);
      cy.get('[data-cy="task-submit-button"]').click();
    });

    // Select the task
    cy.get('[data-cy="select-task"]').click();
    cy.get('[data-cy="selected-tasks"]').should("contain", "1 task selected");

    // Refresh the page
    cy.reload();

    // Verify selection state is maintained
    cy.get('[data-cy="select-task"]').should("be.checked");
    cy.get('[data-cy="selected-tasks"]').should("contain", "1 task selected");
  });
});
