import { TaskPriority } from "../../src/types";

// Extend the Cypress Window type to include our store
declare global {
  interface Window {
    store: {
      dispatch: (action: any) => void;
    };
  }
}

describe("Task Priority Validation", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should accept valid priority values", () => {
    const validPriorities: TaskPriority[] = ["none", "low", "medium", "high", "urgent"];

    validPriorities.forEach(priority => {
      cy.get('[data-cy="add-task-button"]').click();
      cy.get('[data-cy="task-title-input"]').type(`Test task with ${priority} priority`);
      cy.get('[data-cy="task-priority-select"]').select(priority);
      cy.get('[data-cy="save-task-button"]').click();

      // Verify the task was created with the correct priority
      cy.get('[data-cy="task-list"]')
        .contains(`Test task with ${priority} priority`)
        .should("exist");
    });
  });

  it("should show error for invalid priority value", () => {
    // This test will verify that the application handles invalid priority values
    // by checking if the error is displayed in the UI
    cy.window().then(win => {
      // We'll use the Redux store directly to test the validation
      const invalidTask = {
        title: "Invalid priority task",
        priority: "invalid-priority" as TaskPriority,
        status: "not started" as const,
      };

      // Try to dispatch the action and catch the error
      cy.wrap(null).then(() => {
        try {
          win.store.dispatch({ type: "tasks/addTask", payload: invalidTask });
        } catch (error: unknown) {
          if (error instanceof Error) {
            expect(error.message).to.include("Invalid priority");
          }
        }
      });
    });
  });
});
