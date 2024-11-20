describe("Login Page", () => {
  const locale = "en"; // Define the default locale
  const loginUrl = `/${locale}/auth/login`;
  const todosUrl = `/${locale}/todos`;

  beforeEach(() => {
    cy.visit(loginUrl); // Visit the login page
  });

  it("renders the login page with all elements", () => {
    // Verify title and subtitle
    cy.contains("h1", "Log in").should("be.visible");
    cy.contains("p", "Log in and start using the app").should("be.visible");

    // Verify input fields
    cy.get('input[name="email"]').should("be.visible");
    cy.get('input[name="password"]').should("be.visible");

    // Verify login button
    cy.get('button[type="submit"]').contains("Log in").should("be.visible");

    // Verify language switcher
    cy.contains("العربية").should("be.visible");
  });

  it("displays validation errors for empty fields", () => {
    cy.get('button[type="submit"]').click();

    // Verify validation error messages
    cy.contains("This field is required.").should("be.visible");
  });

  it("displays validation error for invalid email format", () => {
    cy.get('input[name="email"]').type("invalid@email");
    cy.get('input[name="password"]').type("password123");
    cy.get('button[type="submit"]').click();

    // Verify invalid email error message
    cy.contains("Please enter a valid email address.").should("be.visible");
  });

  it('shows server error on invalid credentials', () => {
    // Mock invalid credentials response
    cy.intercept('POST', '/api/auth/signin', {
      statusCode: 401,
      body: { error: 'CredentialsSignin' },
    }).as('loginRequest');
  
    // Fill in credentials
    cy.get('input[name="email"]').type('mohammed@g.com');
    cy.get('input[name="password"]').type('!Password1');
    cy.get('button[type="submit"]').click();
  
    // Wait for the intercepted request
    cy.wait(5000); // Wait for 5 seconds
  
    // Verify error message is displayed
    cy.contains('Invalid email or password.').should('be.visible');
  });

  it("allows switching languages", () => {
    // Verify default language is English
    cy.contains("Log in").should("be.visible");

    // Switch to Arabic
    cy.contains("العربية").click();

    // Verify Arabic translation
    cy.url().should("include", "/ar/auth/login");
    cy.contains("تسجيل الدخول").should("be.visible");
  });
  
  it("redirects to todos page on successful login", () => {
    cy.login("mohammed@unicode.com", "!Password1");
  
   // Wait for the intercepted request
   cy.wait(6000);
    cy.url().should("include", "/en/todos");
  });


});
