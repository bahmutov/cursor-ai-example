import { TaskPriority } from "../../src/types";

describe("Tasks", () => {
  it("should accept valid priority values", () => {
    cy.visit("/");
    const validPriorities: TaskPriority[] = ["none", "low", "medium", "high", "urgent"];

    validPriorities.forEach(priority => {
      const title = `Test task with ${priority} priority`;
      cy.get('[data-cy="add-task-button"]').click();
      cy.get('[data-cy="title-input"]').type(title);
      cy.get('[data-cy="priority-select"]').select(priority);
      cy.get('[data-cy="submit-task-button"]').click();

      // Verify the task was created with the correct priority
      cy.contains('[data-cy="task-row"]', title)
        .find('[data-cy="task-priority"]')
        .should("have.text", priority);
    });
  });
});
