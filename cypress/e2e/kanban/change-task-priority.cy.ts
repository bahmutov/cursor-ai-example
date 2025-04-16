import { selectors } from "../../support/selectors";

it("Changes the task priority by dragging the card", () => {
  cy.visit("/");
  cy.createTask({
    title: "Test task",
    description: "Test description",
    status: "completed",
    priority: "low",
  });
  // switch to the Kanban board view
  cy.get(selectors.KanbanView.toggleButton).click();
  cy.get(selectors.KanbanView.container).should("be.visible");
  // confirm the Task card is visible in the "Low" column
  cy.get(selectors.KanbanView.columnLow)
    .should("be.visible")
    .contains(selectors.KanbanView.taskCard, "Test task")
    .should("be.visible");

  // drag the card to the "In Progress" column
  cy.dragAndDrop(
    selectors.KanbanView.taskCard + ":nth-child(1)",
    selectors.KanbanView.columnMedium
  );

  // confirm the card is now in the "Medium" column
  cy.get(selectors.KanbanView.columnMedium)
    .should("be.visible")
    .contains(selectors.KanbanView.taskCard, "Test task")
    .should("be.visible");
  // confirm there are no cards in the "Low" column
  cy.get(selectors.KanbanView.columnLow)
    .should("be.visible")
    .find(selectors.KanbanView.taskCard)
    .should("not.exist");
});
