import 'cypress-localstorage-commands';

describe('Login', () => {
  beforeEach(() => {
    cy.server();
    cy.visit('/login');
    cy.route('POST', `${Cypress.env('backendAPI')}/api/auth/login`).as('login');
  });

  it('logs in user if credentials are correct', () => {
    cy.get('input[name=email]').type('hope@mail.com');
    cy.get('input[name=password]').type('supersecret123');

    cy.get('button[type=submit]').click();
    cy.wait('@login').its('status').should('eq', 200);

    cy.get('@login').should(xhr => {
      expect(xhr.responseBody).to.have.property('token');
    });

    cy.getLocalStorage('token').then(token => {
      cy.intercept(`${Cypress.env('backendAPI')}/api/users`, req => {
        req.headers['authorization'] = `Bearer ${token}`;
      });
    });

    cy.get('h1').should('contain.text', 'Welcome to Cinnamon!');
  });

  it('should throw form error if email is not given at all', () => {
    cy.get('input[name=password]').type('supersecret123');
    cy.get('.input-error').should('have.text', 'Email field can not be empty');
  });

  it('should throw an error if given email is wrong', () => {
    cy.get('input[name=email]').type('wrong-email@mail.com');
    cy.get('input[name=password]').type('supersecret123');

    cy.get('button[type=submit]').click();
    cy.wait('@login').its('status').should('eq', 401);
    cy.get('[href="/login"]').should('be.visible');
    cy.get('input[name=email]').should('be.visible');
  });

  it.only('should throw an error if given email is not a valid email', () => {
    cy.get('input[name=email]').type('invalid.com');
    cy.get('input[name=password]').type('supersecret123');

    cy.get('.input-error').should('have.text', 'Invalid email');
  });

  it('should throw form error if password is not given at all', () => {
    cy.get('input[name=email]').type('hope@mail.com');
    cy.get('button[type=submit]').click();

    cy.get('.input-error').should('have.text', 'Password field can not be empty');
  });

  it('should throw an error if password is wrong', () => {
    cy.get('input[name=email]').type('hope@mail.com');
    cy.get('input[name=password]').type('wrongpass123');

    cy.get('button[type=submit]').click();
    cy.wait('@login').its('status').should('eq', 401);
    cy.get('[href="/login"]').should('be.visible');
    cy.get('input[name=email]').should('be.visible');
  });

  afterEach(() => {
    cy.clearLocalStorage('token');
  });
});
