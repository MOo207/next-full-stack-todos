/// <reference types="cypress" />

// Add TypeScript declarations for custom commands
declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to log in
       * @example cy.login('email@example.com', 'password123')
       */
      login(email: string, password: string): Chainable<void>;

      /**
       * Custom command to toggle the language
       * @example cy.toggleLanguage()
       */
      toggleLanguage(): Chainable<void>;
    }
  }
}

// Implement custom commands
Cypress.Commands.add("login", (email: string, password: string) => {
  cy.visit(`/${Cypress.env("locale")}/auth/login`);
  cy.get('input[placeholder="Email"]').type(email);
  cy.get('input[placeholder="Password"]').type(password);
  cy.contains("Log in").click();
});

Cypress.Commands.add("toggleLanguage", () => {
  cy.get("button").click();
});

export {};
