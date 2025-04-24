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
    // click the undo button
    cy.get(selectors.HistoryControls.undoButton).click();
    // confirm there are no tasks
    cy.get(selectors.ListView.zeroTasks).should("be.visible");
    // click the redo button
    cy.get(selectors.HistoryControls.redoButton).click();
    // confirm the one task is back
    cy.get(selectors.ListView.taskRow).should("have.length", 1);
  });
});
