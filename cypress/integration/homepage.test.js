import 'cypress-localstorage-commands';

describe('Homepage', () => {
  before(() => {
    cy.server();
    cy.login();
  });

  it('should get users from be and show a list of them', () => {
    cy.visit('/');
    cy.route(`${Cypress.env('backendAPI')}/api/users`).as('get-users');
    cy.wait('@get-users').its('status').should('eq', 200);

    cy.get('#users-list').should('be.visible');
  });
  afterEach(() => {
    cy.clearLocalStorage('token');
  });
});
