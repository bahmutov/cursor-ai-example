describe("Example Test Suite", () => {
  it("should visit the homepage", () => {
    cy.visit("/");
    cy.get("h1").should("exist");
  });
});
