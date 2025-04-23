describe("Task Selection", () => {
  beforeEach(() => {
    // Assuming we have a way to seed the database with test tasks
    cy.visit("/");
  });

  it("should toggle task selection when clicking checkbox", () => {
    // Get the first task's checkbox
    cy.get('[data-cy="select-task"]').first().as("firstTaskCheckbox");

    // Initially should not be checked
    cy.get("@firstTaskCheckbox").should("not.be.checked");

    // Click to select
    cy.get("@firstTaskCheckbox").click();
    cy.get("@firstTaskCheckbox").should("be.checked");

    // Click to deselect
    cy.get("@firstTaskCheckbox").click();
    cy.get("@firstTaskCheckbox").should("not.be.checked");
  });

  it("should update selected tasks count in bulk actions bar", () => {
    // Select first task
    cy.get('[data-cy="select-task"]').first().click();

    // Check bulk actions bar shows correct count
    cy.get('[data-cy="selected-tasks"]').should("contain", "1 task selected");

    // Select second task
    cy.get('[data-cy="select-task"]').eq(1).click();

    // Check bulk actions bar updates
    cy.get('[data-cy="selected-tasks"]').should("contain", "2 tasks selected");
  });

  it("should allow bulk deletion of selected tasks", () => {
    // Select multiple tasks
    cy.get('[data-cy="select-task"]').first().click();
    cy.get('[data-cy="select-task"]').eq(1).click();

    // Click delete selected button
    cy.get('[data-cy="delete-selected-button"]').click();

    // Confirm deletion
    cy.on("window:confirm", str => {
      expect(str).to.equal("Are you sure you want to delete 2 tasks?");
      return true;
    });

    // Verify tasks are removed
    cy.get('[data-cy="task-row"]').should("have.length.lessThan", 2);
  });

  it("should select/deselect all tasks when using select all checkbox", () => {
    // Get the select all checkbox
    cy.get('[data-cy="select-all"]').as("selectAll");

    // Initially should not be checked
    cy.get("@selectAll").should("not.be.checked");

    // Click to select all
    cy.get("@selectAll").click();

    // All task checkboxes should be checked
    cy.get('[data-cy="select-task"]').each($checkbox => {
      cy.wrap($checkbox).should("be.checked");
    });

    // Click to deselect all
    cy.get("@selectAll").click();

    // All task checkboxes should be unchecked
    cy.get('[data-cy="select-task"]').each($checkbox => {
      cy.wrap($checkbox).should("not.be.checked");
    });
  });
});
