import { selectors } from "../support/selectors";

describe("Sort tasks", () => {
  beforeEach(() => {
    // visit the app
    cy.visit("/");

    // create 3 tasks with different titles
    cy.get(selectors.CreateTaskButton.button).click();
    cy.get(selectors.TaskForm.titleInput).type("Task B");
    cy.get(selectors.TaskForm.submitButton).click();

    cy.get(selectors.CreateTaskButton.button).click();
    cy.get(selectors.TaskForm.titleInput).type("Task A");
    cy.get(selectors.TaskForm.submitButton).click();

    cy.get(selectors.CreateTaskButton.button).click();
    cy.get(selectors.TaskForm.titleInput).type("Task C");
    cy.get(selectors.TaskForm.submitButton).click();
  });

  it("sorts by task title", () => {
    // click on the task title column
    cy.get(selectors.ListView.taskTitleHeader).click();

    // confirm the task titles are sorted alphabetically
    cy.get(selectors.ListView.taskRows).should("have.length", 3);
    cy.get(selectors.ListView.taskTitle).then($titles => {
      const titles = $titles.map((_, el) => Cypress.$(el).text()).get();
      expect(titles).to.deep.equal(["Task A", "Task B", "Task C"]);
    });

    // click the task title column again
    cy.get(selectors.ListView.taskTitleHeader).click();

    // confirm the task titles are sorted alphabetically in reverse
    cy.get(selectors.ListView.taskTitle).then($titles => {
      const titles = $titles.map((_, el) => Cypress.$(el).text()).get();
      expect(titles).to.deep.equal(["Task C", "Task B", "Task A"]);
    });
  });
});
