import { Task } from "../../src/types";
import { selectors } from "../support/selectors";

describe("List Filter", () => {
  beforeEach(() => {
    // Reset the application state before each test
    cy.visit("/");
    // we start with zero task rows
    cy.get(selectors.ListView.taskRow).should("have.length", 0);
    cy.get(selectors.ListView.zeroTasks).should("be.visible");
  });

  it("should filter tasks by search term", () => {
    // Load the tasks from the fixture
    cy.fixture("4-tasks.json").then((tasks: Task[]) => {
      // Create each task in the application
      tasks.forEach((task, k) => {
        cy.createTask({
          title: task.title,
          description: task.description,
          status: task.status,
          priority: task.priority,
          customFields: task.customFields,
        });
        cy.get(selectors.ListView.taskRow).should("have.length", k + 1);
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
