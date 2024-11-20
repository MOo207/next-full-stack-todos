/// <reference types="cypress" />

describe("Todo Application", () => {
  const locale = "en"; // Define the default locale
  const todoTitle = "New Todo Item";
  const updatedTodoTitle = "Updated Todo Item";

  beforeEach(() => {
    // Visit the application
    cy.login("mohammed@unicode.com", "!Password1");
    cy.wait(5000); // Wait for 5 seconds
    cy.visit(`/${locale}/todos`); // Adjust the URL to match your application's route
  });

  it("should display the initial todos", () => {
    cy.get("[data-cy=todo-item]").should("exist");
  });

  it("should add a new todo", () => {
    // Type a new todo title
    cy.get("[data-cy=add-todo-input]").type(todoTitle);

    // Submit the todo
    cy.get("[data-cy=add-todo-button]").click();

    // Verify the new todo is added
    cy.contains(todoTitle).should("exist");
  });

  it("should edit a todo", () => {
    // Locate the first todo's edit button and click it
    cy.get("[data-cy=todo-item]").first().within(() => {
      cy.get("[data-cy=edit-button]").click();
    });

    // Type the updated title and save
    cy.get("[data-cy=edit-input]")
      .clear()
      .type(updatedTodoTitle);
    cy.get("[data-cy=save-edit-button]").click();

    // Verify the todo title is updated
    cy.contains(updatedTodoTitle).should("exist");
  });

  it("should toggle a todo's completion status", () => {
    // Locate the first todo's toggle button and click it
    cy.get("[data-cy=todo-item]").first().within(() => {
      cy.get("[data-cy=toggle-button]").click();
    });

    // Verify the todo's completion status changes
    cy.get("[data-cy=todo-item]").first().should("have.class", "line-through");
  });

  it("should delete a todo", () => {
    // Count the current number of todos
    cy.get("[data-cy=todo-item]").then((todos) => {
      const initialCount = todos.length;

      // Delete the first todo
      cy.get("[data-cy=todo-item]").first().within(() => {
        cy.get("[data-cy=delete-button]").click();
      });

      // Verify the todo count decreases
      cy.get("[data-cy=todo-item]").should("have.length", initialCount - 1);
    });
  });

  it("should handle errors gracefully", () => {
    // Simulate an invalid input
    cy.get("[data-cy=add-todo-input]").type("   "); // Empty todo
    cy.get("[data-cy=add-todo-button]").click();

    // Verify an error message is displayed
    cy.get("[data-cy=error-message]").should("exist");
  });
});
