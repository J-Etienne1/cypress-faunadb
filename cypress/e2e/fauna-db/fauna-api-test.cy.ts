describe("Fauna API Test", () => {
  it("Should fetch data from Fauna and verify the response", () => {
    // Get Fauna secret from environment variable
    const secret: string = Cypress.env("FAUNA_SECRET") as string; // Ensure it's a string

    const url: string = "https://db.fauna.com"; // URL for Fauna API

    cy.request({
      method: "POST", // Use POST method for querying Fauna
      url: `${url}`, // Use Fauna URL directly (or adjust for specific collection endpoint)
      headers: {
        Authorization: `Bearer ${secret}`, // Include Authorization header with Bearer token
      },
      body: {
        query: "users.all()", // Query for fetching all users
      },
    }).then((response) => {
      // Verify that the status code is 200 (OK)
      expect(response.status).to.eq(200);

      // Log the response body for inspection
      cy.log("Response:", JSON.stringify(response.body));

      // Additional validation on response data if needed
      expect(response.body).to.have.property("data");
    });
  });
});

