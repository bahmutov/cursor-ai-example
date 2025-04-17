import { selectors } from "../support/selectors";

it("deletes multiple tasks", () => {
  cy.visit("/");
  // add 4 tasks
  cy.createTask({
    title: "Task 1",
    description: "Description 1",
    status: "in progress",
    priority: "high",
  });
  cy.createTask({
    title: "Task 2",
    description: "Description 2",
    status: "in progress",
    priority: "high",
  });
  cy.createTask({
    title: "Task 3",
    description: "Description 3",
    status: "in progress",
    priority: "high",
  });
  cy.createTask({
    title: "Task 4",
    description: "Description 4",
    status: "in progress",
    priority: "high",
  });
  // select all tasks
  cy.get(selectors.ListView.taskRow).should("have.length", 4);
  cy.get(selectors.ListView.selectAllCheckbox).click();
  // delete all tasks
  cy.get(selectors.ListView.deleteButton).click();
  // confirm the deletion
  cy.get(selectors.ListView.zeroTasks).should("be.visible");
});
