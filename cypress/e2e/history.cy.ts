import { selectors } from "../support/selectors";

describe("Undo / Redo History", () => {
  it("undo the last action", () => {
    cy.visit("/");
    cy.get(selectors.ListView.zeroTasks).should("be.visible");
    cy.createTask({
      title: "Task 1",
      description: "Description 1",
      status: "in progress",
      priority: "high",
    });
    cy.get(selectors.ListView.taskRow).should("have.length", 1);
  });
});
