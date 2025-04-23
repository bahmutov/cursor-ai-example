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
      /**
       * Simple drag and drop command. Implemented using cypress-real-events plugin.
       * @param source - The source element to drag (selector)
       * @param target - The target element to drop (selector)
       * @example
       * cy.dragAndDrop(selectors.TaskCard.locator, selectors.TaskBoard.locator);
       */
      dragAndDrop(source: string, target: string): Chainable<void>;
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

Cypress.Commands.add("dragAndDrop", (source: string, target: string) => {
  cy.get(source)
    .realMouseDown({ button: "left", position: "center" })
    .realMouseMove(0, 10, { position: "center" })
    .wait(200);
  cy.get(target).realMouseMove(0, 0, { position: "center" }).realMouseUp();
});
