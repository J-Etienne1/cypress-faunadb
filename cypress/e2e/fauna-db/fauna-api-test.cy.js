describe("Fauna API Test", () => {
  it("Should fetch data from Fauna and verify the response", () => {
    const secret = Cypress.env("FAUNA_SECRET"); // Use FAUNA_SECRET from your .env file
    const url = "https://db.fauna.com"; // Fauna base URL for FQL v10 queries

    cy.log("FAUNA_SECRET:", secret);

    cy.request({
      method: "POST", // FQL v10 requires POST requests
      url: url,
      headers: {
        Authorization: `Bearer ${secret}`, // Use the correct secret
        "Content-Type": "application/json", // Required for JSON payload
      },
      body: {
        query: "users.all()", // FQL query to fetch all users
      },
    }).then((response) => {
      // Verify status code
      expect(response.status).to.eq(200);

      // Log the full response to the console
      cy.log("Response:", JSON.stringify(response.body));

      // Verify that the response contains the 'data' property
      expect(response.body).to.have.property("data");

      // Verify that at least one user is returned
      const users = response.body.data;
      expect(users).to.be.an("array").and.to.have.length.greaterThan(0);

      // Check the first user's structure (optional, based on your needs)
      const firstUser = users[0];
      expect(firstUser).to.have.property("id");
      expect(firstUser).to.have.property("Name");
      expect(firstUser.Name).to.eq("Jason"); // Example validation
    });
  });
});
