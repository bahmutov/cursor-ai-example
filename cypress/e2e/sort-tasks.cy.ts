import { selectors } from "../support/selectors";

describe("Sort tasks", () => {
  beforeEach(() => {
    // visit the app
    cy.visit("/");
    // create 3 tasks with different titles and priorities
    // task B, task A, task C
    cy.createTask({
      title: "Task B",
      description: "Task B description",
      status: "not started",
      priority: "high",
    });
    cy.createTask({
      title: "Task A",
      description: "Task A description",
      status: "in progress",
      priority: "low",
    });
    cy.createTask({
      title: "Task C",
      description: "Task C description",
      status: "completed",
      priority: "medium",
    });
    // confirm there are 3 tasks
    cy.get(selectors.ListView.taskTitle).should("have.length", 3);
  });

  it("sorts by task title", () => {
    // click on the task title column
    cy.get(selectors.ListView.taskTitleHeader).click();
    cy.get(selectors.ListView.taskTitleHeader).should("have.text", "Title ↓");
    // confirm the task titles are sorted alphabetically
    cy.get(selectors.ListView.taskTitle).should("read", ["Task C", "Task B", "Task A"]);
    // click the task title column again
    cy.get(selectors.ListView.taskTitleHeader).click();
    cy.get(selectors.ListView.taskTitleHeader).should("have.text", "Title ↑");
    // confirm the task titles are sorted alphabetically in reverse
    cy.get(selectors.ListView.taskTitle).should("read", ["Task A", "Task B", "Task C"]);
  });

  it("sorts by task status", () => {
    // click on the status column
    cy.get(selectors.ListView.taskStatusHeader).click();
    cy.get(selectors.ListView.taskStatusHeader).should("have.text", "Status ↓");
    // confirm the task statuses are sorted alphabetically
    cy.get(selectors.ListView.taskStatus).should("read", [
      "not started",
      "in progress",
      "completed",
    ]);
    // click the status column again
    cy.get(selectors.ListView.taskStatusHeader).click();
    cy.get(selectors.ListView.taskStatusHeader).should("have.text", "Status ↑");
    // confirm the task statuses are sorted alphabetically in reverse
    cy.get(selectors.ListView.taskStatus).should("read", [
      "completed",
      "in progress",
      "not started",
    ]);
  });

  it("sorts by task priority", () => {
    // click on the priority column
    cy.get(selectors.ListView.taskPriorityHeader).click();
    cy.get(selectors.ListView.taskPriorityHeader).should("have.text", "Priority ↓");
    // confirm the task priorities are sorted alphabetically
    cy.get(selectors.ListView.taskPriority).should("read", ["high", "medium", "low"]);
    // click the priority column again
    cy.get(selectors.ListView.taskPriorityHeader).click();
    cy.get(selectors.ListView.taskPriorityHeader).should("have.text", "Priority ↑");
    // confirm the task priorities are sorted alphabetically in reverse
    cy.get(selectors.ListView.taskPriority).should("read", ["low", "medium", "high"]);
  });
});
