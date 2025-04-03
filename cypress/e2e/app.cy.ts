describe("App", () => {
  it("should load the application", () => {
    cy.visit("/");
    // verify the app container exists
    cy.get("#root").should("exist");
  });
});
