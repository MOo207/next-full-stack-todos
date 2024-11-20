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
  // Fill in credentials
  cy.get('input[name="email"]').type(email);
  cy.get('input[name="password"]').type(password);
  cy.get('button[type="submit"]').click();
});

export {};
