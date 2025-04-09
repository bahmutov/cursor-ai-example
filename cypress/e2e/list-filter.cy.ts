// import the task definitions from the fixture file "4-tasks.json"
// iterate over the tasks and create them in the application
// confirm the task names shown in the List view
// filter the tasks by part of the name
// confirm the filtered list of tasks is shown

import { Task } from "../../src/types";
import { selectors } from "../support/selectors";

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
        cy.get(selectors.CreateTaskButton.button).click();
        cy.get(selectors.TaskForm.titleInput).type(task.title);
        cy.get(selectors.TaskForm.descriptionInput).type(task.description);
        cy.get(selectors.TaskForm.statusSelect).select(task.status);
        cy.get(selectors.TaskForm.prioritySelect).select(task.priority);
        cy.get(selectors.TaskForm.submitButton).click();
      });

      // Verify all tasks are visible in the list
      tasks.forEach(task => {
        cy.get(selectors.ListView.container).should("contain", task.title);
      });

      // Filter tasks by search term "database"
      cy.get(selectors.ListView.searchInput).type("database");

      // Verify only the matching task is visible
      cy.get(selectors.ListView.container).should("contain", "Optimize database queries");
      cy.get(selectors.ListView.container).should("not.contain", "Implement user authentication");
      cy.get(selectors.ListView.container).should("not.contain", "Fix navigation bug");
      cy.get(selectors.ListView.container).should("not.contain", "Update documentation");
    });
  });
});
