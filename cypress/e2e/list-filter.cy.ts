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

  afterEach(() => {
    // Clean up tasks after each test
    cy.get(selectors.ListView.taskRow).then($rows => {
      if ($rows.length > 0) {
        cy.get(selectors.ListView.taskRow).each($row => {
          cy.wrap($row).find(selectors.DeleteTaskButton.button).click();
          cy.on("window:confirm", () => true);
        });
      }
    });
  });

  const createTasks = (tasks: Task[]) => {
    tasks.forEach(task => {
      cy.get(selectors.CreateTaskButton.button).click();
      cy.get(selectors.TaskForm.titleInput).type(task.title);
      cy.get(selectors.TaskForm.descriptionInput).type(task.description);
      cy.get(selectors.TaskForm.statusSelect).select(task.status);
      cy.get(selectors.TaskForm.prioritySelect).select(task.priority);
      cy.get(selectors.TaskForm.submitButton).click();
    });
  };

  const verifyTasksVisible = (tasks: Task[]) => {
    tasks.forEach(task => {
      cy.get(selectors.ListView.container).should("contain", task.title);
    });
  };

  const verifyTasksNotVisible = (tasks: Task[]) => {
    tasks.forEach(task => {
      cy.get(selectors.ListView.container).should("not.contain", task.title);
    });
  };

  it("should filter tasks by search term", () => {
    // Load the tasks from the fixture
    cy.fixture("4-tasks.json").then((tasks: Task[]) => {
      // Create each task in the application
      createTasks(tasks);
      verifyTasksVisible(tasks);

      // Filter tasks by search term "database"
      cy.get(selectors.ListView.searchInput).type("database");

      // Verify only the matching task is visible
      cy.get(selectors.ListView.container).should("contain", "Optimize database queries");
      verifyTasksNotVisible(tasks.filter(t => t.title !== "Optimize database queries"));
    });
  });

  it("should filter tasks by exact search term", () => {
    cy.fixture("4-tasks.json").then((tasks: Task[]) => {
      createTasks(tasks);
      verifyTasksVisible(tasks);

      // Search for exact term
      cy.get(selectors.ListView.searchInput).type("database");

      // Verify only the matching task is visible
      cy.get(selectors.ListView.container).should("contain", "Optimize database queries");
      verifyTasksNotVisible(tasks.filter(t => t.title !== "Optimize database queries"));
    });
  });

  it("should perform case-insensitive search", () => {
    cy.fixture("4-tasks.json").then((tasks: Task[]) => {
      createTasks(tasks);
      verifyTasksVisible(tasks);

      // Search with different case
      cy.get(selectors.ListView.searchInput).type("DATABASE");

      // Verify case-insensitive match
      cy.get(selectors.ListView.container).should("contain", "Optimize database queries");
      verifyTasksNotVisible(tasks.filter(t => t.title !== "Optimize database queries"));
    });
  });

  it("should match partial words", () => {
    cy.fixture("4-tasks.json").then((tasks: Task[]) => {
      createTasks(tasks);
      verifyTasksVisible(tasks);

      // Search for partial word
      cy.get(selectors.ListView.searchInput).type("data");

      // Verify partial match
      cy.get(selectors.ListView.container).should("contain", "Optimize database queries");
      verifyTasksNotVisible(tasks.filter(t => t.title !== "Optimize database queries"));
    });
  });

  it("should clear search results when input is cleared", () => {
    cy.fixture("4-tasks.json").then((tasks: Task[]) => {
      createTasks(tasks);
      verifyTasksVisible(tasks);

      // Search for a term
      cy.get(selectors.ListView.searchInput).type("database");

      // Clear the search
      cy.get(selectors.ListView.searchInput).clear();

      // Verify all tasks are visible again
      verifyTasksVisible(tasks);
    });
  });

  it("should handle empty search", () => {
    cy.fixture("4-tasks.json").then((tasks: Task[]) => {
      createTasks(tasks);
      verifyTasksVisible(tasks);

      // Perform empty search
      cy.get(selectors.ListView.searchInput).type("{enter}");

      // Verify all tasks remain visible
      verifyTasksVisible(tasks);
    });
  });

  it("should handle special characters in search", () => {
    cy.fixture("4-tasks.json").then((tasks: Task[]) => {
      // Add a task with special characters
      const specialTask = {
        ...tasks[0],
        title: "Task with special chars: !@#$%^&*()",
      };
      createTasks([...tasks, specialTask]);
      verifyTasksVisible([...tasks, specialTask]);

      // Search for special characters
      cy.get(selectors.ListView.searchInput).type("!@#$%^&*()");

      // Verify only the matching task is visible
      cy.get(selectors.ListView.container).should("contain", specialTask.title);
      verifyTasksNotVisible(tasks);
    });
  });
});
