describe('Fauna API Test', () => {
    it('Should fetch data from Fauna and verify the response', () => {
      const secret = Cypress.env('FAUNA_SECRET');
      const url = 'https://db.fauna.com';
  
      cy.request({
        method: 'GET',
        url: `${url}/collections/test_data`, // Replace with your endpoint
        headers: {
          Authorization: `Bearer ${secret}`,
        },
      }).then((response) => {
        // Verify status code
        expect(response.status).to.eq(200);
  
        // Console log the response
        cy.log('Response:', JSON.stringify(response.body));
  
        // Additional assertions if needed
        expect(response.body).to.have.property('data');
      });
    });
  });
  