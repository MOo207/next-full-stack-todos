describe("Todo Management", () => {
    const locale = "en";
  
    beforeEach(() => {
      // Log in before each test
      cy.visit(`/${locale}/auth/login`);
      cy.get('input[placeholder="Email"]').type("testuser@example.com");
      cy.get('input[placeholder="Password"]').type("Password123!");
      cy.contains("Log in").click();
    });
  
    it("should create a new todo", () => {
      cy.get('input[placeholder="New Todo"]').type("New Todo Item");
      cy.contains("Add Todo").click();
      cy.contains("New Todo Item").should("exist");
    });
  
    it("should update a todo", () => {
      cy.get('button[aria-label="Edit"]').first().click();
      cy.get('input[placeholder="Edit Todo"]').clear().type("Updated Todo Item");
      cy.contains("Save").click();
      cy.contains("Updated Todo Item").should("exist");
    });
  
    it("should toggle todo completion", () => {
      cy.get('input[type="checkbox"]').first().check();
      cy.get('input[type="checkbox"]').first().should("be.checked");
    });
  
    it("should delete a todo", () => {
      cy.get('button[aria-label="Delete"]').first().click();
      cy.contains("Deleted Todo Item").should("not.exist");
    });
  });
  