describe("App", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should load the application", () => {
    cy.get("h1").should("be.visible");
  });
});
