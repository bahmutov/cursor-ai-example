import { selectors } from "../support/selectors";

describe("Task Selection", () => {
  beforeEach(() => {
    // Reset the database and visit the list view
    cy.visit("/");
    // create 3 tasks
    cy.createTask({
      title: "Test Task 1",
      description: "Test Description",
      status: "not started",
      priority: "medium",
    });
    cy.createTask({
      title: "Test Task 2",
      description: "Test Description",
      status: "in progress",
      priority: "high",
    });
    cy.createTask({
      title: "Test Task 3",
      description: "Test Description",
      status: "completed",
      priority: "low",
    });
  });

  it("should toggle individual task selection", () => {
    // Test task selection
    cy.get(selectors.ListView.selectTask).first().should("not.be.checked");
    cy.get(selectors.ListView.selectTask).first().click();
    cy.get(selectors.ListView.selectTask).first().should("be.checked");
    cy.get(selectors.ListView.selectedTasks).should("contain", "1 task selected");

    // Test task deselection
    cy.get(selectors.ListView.selectTask).first().click();
    cy.get(selectors.ListView.selectTask).first().should("not.be.checked");
    cy.get(selectors.ListView.selectedTasks).should("not.exist");
  });
});
