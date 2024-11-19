describe("Authentication", () => {
  const locale = "en"; // Define default locale

  it("should register a new user", () => {
    cy.visit(`/${locale}/auth/register`); // Include locale in the URL
    cy.get('input[placeholder="Name"]').type("Test User");
    cy.get('input[placeholder="Email"]').type("testuser@example.com");
    cy.get('input[placeholder="Password"]').type("Password123!");
    cy.get('input[placeholder="Confirm Password"]').type("Password123!");
    cy.contains("Register").click();
    cy.url().should("include", `/${locale}/auth/login`); // Check redirect with locale
  });

  it("should log in an existing user", () => {
    cy.visit(`/${locale}/auth/login`); // Include locale in the URL
    cy.get('input[placeholder="Email"]').type("testuser@example.com");
    cy.get('input[placeholder="Password"]').type("Password123!");
    cy.contains("Log in").click();
    cy.url().should("include", `/${locale}/todos`); // Check redirect with locale
  });

  it("should log out the user", () => {
    cy.visit(`/${locale}/auth/login`);
    cy.get('input[placeholder="Email"]').type("testuser@example.com");
    cy.get('input[placeholder="Password"]').type("Password123!");
    cy.contains("Log in").click();

    // Click the logout button
    cy.contains("Sign Out").click();
    cy.url().should("include", `/${locale}/auth/login`);
  });
});
