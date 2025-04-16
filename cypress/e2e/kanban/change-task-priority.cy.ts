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
  // confirm the Task card is visible in the "Low" column
  // drag the card to the "Medium" column
  // confirm the card is now in the "Medium" column
  // confirm there are no cards in the "Low" column
});
