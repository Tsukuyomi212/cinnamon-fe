import 'cypress-localstorage-commands';

describe('Signup', () => {
  beforeEach(() => {
    cy.server();
    cy.visit('/signup');
    cy.route('POST', `${Cypress.env('backendAPI')}/api/auth/signup`).as('signup');
  });

  it('creates and logs in new user if signup data is valid', () => {
    cy.get('input[name=username]').type('test29');
    cy.get('input[name=email]').type('test29@mail.com');
    cy.get('input[name=password]').type('supersecret123');
    cy.get('input[name=passwordConfirmation]').type('supersecret123');
    cy.get('button[type=submit]').click();

    cy.wait('@signup').its('status').should('eq', 201);

    cy.get('@signup').should(({ response }) => {
      expect(response.body).to.have.property('user');
    });

    cy.getLocalStorage('token').then(token => {
      cy.intercept(`${Cypress.env('backendAPI')}/api/auth/me`, req => {
        req.headers['authorization'] = `Bearer ${token}`;
      });
      cy.intercept(`${Cypress.env('backendAPI')}/api/users`, req => {
        req.headers['authorization'] = `Bearer ${token}`;
      });
    });

    cy.get('h1').should('contain.text', 'Welcome to Cinnamon!');
  });

  afterEach(() => {
    cy.clearLocalStorage('token');
  });
});
