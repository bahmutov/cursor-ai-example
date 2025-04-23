import { selectors } from "../support/selectors";

describe("Task Selection", () => {
  beforeEach(() => {
    // Assuming we have a way to seed the database with test tasks
    cy.visit("/");
    // create 3 tasks
    cy.createTask({
      title: "Task 1",
      description: "Task 1 description",
      status: "not started",
      priority: "high",
    });
    cy.createTask({
      title: "Task 2",
      description: "Task 2 description",
      status: "in progress",
      priority: "medium",
    });
    cy.createTask({
      title: "Task 3",
      description: "Task 3 description",
      status: "completed",
      priority: "low",
    });
  });

  it("should update selected tasks count in bulk actions bar", () => {
    // Select first task
    cy.get(selectors.ListView.selectTask).first().click();

    // Check bulk actions bar shows correct count
    cy.get(selectors.ListView.selectedTasks).should("contain", "1 task selected");

    // Select second task
    cy.get(selectors.ListView.selectTask).eq(1).click();

    // Check bulk actions bar updates
    cy.get(selectors.ListView.selectedTasks).should("contain", "2 tasks selected");

    // deselect the first tast
    cy.get(selectors.ListView.selectTask).first().click();

    // Check bulk actions bar updates
    cy.get(selectors.ListView.selectedTasks).should("contain", "1 task selected");
  });
});
