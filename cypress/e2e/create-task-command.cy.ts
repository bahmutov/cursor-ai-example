/// <reference types="cypress" />
import { Task } from "../../src/types";
import "../support/commands";

interface CreateTaskInput {
  title: string;
  description: string;
  status: Task["status"];
  priority: Task["priority"];
  customFields?: Record<string, string | number | boolean>;
}

describe("Create Task Command", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("creates a task using the custom command", () => {
    const task: CreateTaskInput = {
      title: "Test Task",
      description: "This is a test task created using the custom command",
      status: "in progress",
      priority: "high",
      customFields: {},
    };

    cy.createTask(task);

    // Verify the task was created
    cy.get('[data-cy="task-title"]').should("contain", task.title).and("contain", task.description);
  });
});
