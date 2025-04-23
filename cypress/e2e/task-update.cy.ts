import { selectors } from "../support/selectors";

describe("Task Update", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("updates an existing task through the UI", () => {
    // Create a task first
    cy.createTask({
      title: "Original Task",
      description: "Original description",
      status: "in progress",
      priority: "high",
    });

    // Find the task in the list and click to edit
    cy.contains(selectors.ListView.taskRow, "Original Task")
      .find(selectors.ListView.editButton)
      .click();

    // Update the task details
    cy.get(selectors.TaskForm.container).within(() => {
      cy.get(selectors.TaskForm.titleInput)
        .should("have.value", "Original Task")
        .clear()
        .type("Updated Task");
      cy.get(selectors.TaskForm.descriptionInput)
        .should("have.value", "Original description")
        .clear()
        .type("Updated description");
      cy.get(selectors.TaskForm.statusSelect)
        .should("have.value", "in progress")
        .select("Completed");
      cy.get(selectors.TaskForm.prioritySelect).should("have.value", "high").select("Low");
      cy.get(selectors.TaskForm.submitButton).click();
    });

    // Verify the task was updated in the list view
    cy.get(selectors.ListView.taskRow).within(() => {
      cy.get(selectors.ListView.taskTitle).should("have.text", "Updated Task");
      cy.get(selectors.ListView.taskDescription).should("have.text", "Updated description");
      cy.get(selectors.ListView.taskStatus).should("have.text", "completed");
      cy.get(selectors.ListView.taskPriority).should("have.text", "low");
    });
  });
});
