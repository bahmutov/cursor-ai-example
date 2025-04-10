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

      // Verify all tasks are visible in the list in order
      cy.get(selectors.ListView.container)
        .find(selectors.ListView.taskTitle)
        .should("read", [
          "Optimize database queries",
          "Update documentation",
          "Fix navigation bug",
          "Implement user authentication",
        ]);

      // Filter tasks by search term "database"
      cy.get(selectors.ListView.searchInput).type("database");

      // Verify only the matching task is visible
      cy.get(selectors.ListView.container)
        .find(selectors.ListView.taskTitle)
        .should("read", ["Optimize database queries"]);
    });
  });
});
