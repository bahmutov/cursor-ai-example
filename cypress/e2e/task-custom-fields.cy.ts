import { selectors } from "../support/selectors";

it("adds a task with 2 custom fields", () => {
  // visit the app
  cy.visit("/");
  // open the create task form
  cy.get(selectors.CreateTaskButton.button).click();

  // enter a title
  cy.get(selectors.TaskForm.titleInput).type("Test Task");
  // click on the custom fields toggle button
  cy.get(selectors.TaskForm.toggleCustomFields).click();

  // the custom fields element should appear
  cy.get(selectors.TaskForm.customFields).should("be.visible");

  // enter a custom field name and value
  cy.get(selectors.TaskForm.newCustomFieldName).type("Due Date");
  cy.get(selectors.TaskForm.newCustomFieldValue).type("2024-12-31");

  // click the "Add Field" new custom field button
  cy.get(selectors.TaskForm.addNewCustomField).click();

  // enter another custom field
  cy.get(selectors.TaskForm.newCustomFieldName).type("Assignee");
  cy.get(selectors.TaskForm.newCustomFieldValue).type("John Doe");
  cy.get(selectors.TaskForm.addNewCustomField).click();

  // confirm the custom fields are displayed
  cy.get(selectors.TaskForm.customFields).within(() => {
    cy.get('[data-cy="custom-field"]').should("have.length", 2);
    cy.get('[data-cy="custom-field-name"]').should("read", ["Due Date", "Assignee"]);
    cy.get('[data-cy="custom-field-value"]').should("read", ["2024-12-31", "John Doe"]);
  });
});
