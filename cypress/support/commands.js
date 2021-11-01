Cypress.Commands.add('seedAndVisit', (seedData = 'fixture:users') => {
  cy.server();
  cy.route('GET', '/api/users', seedData);
  cy.visit('/');
});

Cypress.Commands.add('goToLoginPage', () => {
  cy.server();
  cy.visit('/login');
});

Cypress.Commands.add('login', () => {
  cy.request({
    method: 'POST',
    url: `${Cypress.env('backendAPI')}/api/auth/login`,
    body: {
      email: 'hope@mail.com',
      password: 'supersecret123',
    },
  }).then(resp => {
    expect(resp.body).to.have.property('token');
    cy.setLocalStorage('token', `${resp.body.token}`);
  });
});
