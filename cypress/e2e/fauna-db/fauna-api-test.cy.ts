describe("Fauna API Test", () => {
  it("Should fetch data from Fauna and verify the response", () => {
    // Get Fauna secret from environment variable
    const secret: string = Cypress.env("FAUNA_SECRET") as string;

    const url: string = "https://db.fauna.com";

    cy.request({
      method: "POST",
      url: `${url}`,
      headers: {
        Authorization: `Bearer ${secret}`,
      },
      body: {
        query: "users.all()",
      },
    }).then((response) => {
      expect(response.status).to.eq(200);

      cy.log("Response:", JSON.stringify(response.body));

      expect(response.body).to.have.property("data");
    });
  });
});
