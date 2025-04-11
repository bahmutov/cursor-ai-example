// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })

// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })

// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })

// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import { Task } from "../../src/types";
import { selectors } from "./selectors";

interface CreateTaskInput {
  title: string;
  description: string;
  status: Task["status"];
  priority: Task["priority"];
  customFields?: Record<string, string | number | boolean>;
}

declare global {
  namespace Cypress {
    interface Chainable {
      createTask(task: CreateTaskInput): Chainable<void>;
    }
  }
}

Cypress.Commands.add("createTask", (task: CreateTaskInput) => {
  cy.get(selectors.CreateTaskButton.button).click();
  cy.get(selectors.TaskForm.titleInput).type(task.title);
  cy.get(selectors.TaskForm.descriptionInput).type(task.description);
  cy.get(selectors.TaskForm.statusSelect).select(task.status);
  cy.get(selectors.TaskForm.prioritySelect).select(task.priority);
  cy.get(selectors.TaskForm.submitButton).click();
});
