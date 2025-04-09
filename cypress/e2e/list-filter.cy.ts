// import the task definitions from the fixture file "4-tasks.json"
// iterate over the tasks and create them in the application
// confirm the task names shown in the List view
// filter the tasks by part of the name
// confirm the filtered list of tasks is shown

import { Task } from "../../src/types";

describe("List Filter", () => {
  beforeEach(() => {
    // Reset the application state before each test
    cy.visit("/");
  });

  it("should filter tasks by search term", () => {
    // Load the tasks from the fixture
    cy.fixture("4-tasks.json").then((tasks: Task[]) => {
      // Create each task in the application
      tasks.forEach(task => {
        cy.get("[data-cy=add-task-button]").click();
        cy.get("[data-cy=task-title-input]").type(task.title);
        cy.get("[data-cy=task-description-input]").type(task.description);
        cy.get("[data-cy=task-status-select]").select(task.status);
        cy.get("[data-cy=task-priority-select]").select(task.priority);
        cy.get("[data-cy=save-task-button]").click();
      });

      // Verify all tasks are visible in the list
      tasks.forEach(task => {
        cy.get("[data-cy=task-list]").should("contain", task.title);
      });

      // Filter tasks by search term "database"
      cy.get("[data-cy=task-search-input]").type("database");

      // Verify only the matching task is visible
      cy.get("[data-cy=task-list]").should("contain", "Optimize database queries");
      cy.get("[data-cy=task-list]").should("not.contain", "Implement user authentication");
      cy.get("[data-cy=task-list]").should("not.contain", "Fix navigation bug");
      cy.get("[data-cy=task-list]").should("not.contain", "Update documentation");
    });
  });
});
