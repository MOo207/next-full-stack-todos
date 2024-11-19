describe("Internationalization", () => {
    it("should display the app in English", () => {
      cy.visit("/en/auth/login");
      cy.contains("Log in").should("exist");
    });
  
    it("should switch to Arabic and display the app in Arabic", () => {
      cy.visit("/en/auth/login");
  
      // Ensure the switcher exists and click it
      cy.get('[data-testid="language-switcher"]')
        .should("exist")
        .then(() => cy.log("Language switcher exists"))
        .click();
  
      // Check URL and text after switching
      cy.url()
        .should("include", "/ar/auth/login")
        .then(() => cy.log("Switched to Arabic"));
      cy.contains("تسجيل الدخول").should("exist");
    });
  
    it("should maintain the locale across routes", () => {
      cy.visit("/ar/auth/login");
      cy.get('input[placeholder="البريد الإلكتروني"]').type("testuser@example.com");
      cy.get('input[placeholder="كلمة المرور"]').type("Password123!");
      cy.contains("تسجيل الدخول").click();
  
      cy.location("pathname", { timeout: 10000 })
        .should("include", "/ar/todos")
        .then(() => cy.log("Navigated to Arabic Todos page"));
      cy.contains("قائمة المهام").should("exist");
    });
  });
  