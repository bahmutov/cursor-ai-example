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
  cy.get('[data-cy="custom-fields"]').should("be.visible");

  // enter a custom field name and value
  cy.get('[data-cy="new-custom-field-name"]').type("nickname");
  cy.get('[data-cy="new-custom-field-value"]').type("tiny task");

  // click the "Add Field" new custom field button
  cy.get('[data-cy="add-new-custom-field"]').click();

  // confirm the custom fields are displayed
  cy.get('[data-cy="custom-fields"]').should("be.visible");
  cy.get('[data-cy="custom-field"]').should("be.visible");
  cy.get('[data-cy="custom-field-name"]').should("have.text", "nickname");
  cy.get('[data-cy="custom-field-value"]').should("have.text", "tiny task");
});
