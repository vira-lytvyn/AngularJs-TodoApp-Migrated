// cypress/e2e/todo.cy.ts
// E2E tests for TodoComponent using Cypress

describe('Todo App', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should add a todo', () => {
    cy.get('input[name="todoText"]').type('write a cypress test{enter}');
    cy.get('.note').should('have.length', 1);
    cy.get('.note app-editable-label')
      .first()
      .should('contain.text', 'write a cypress test');
  });

  it('should remove a todo', () => {
    cy.get('input[name="todoText"]').type('write a cypress test{enter}');
    cy.get('.note').should('have.length', 1);
    cy.get('.note app-editable-label')
      .first()
      .should('contain.text', 'write a cypress test');
    cy.get('.note .btn-danger').first().click();
    cy.get('.note').should('have.length', 0);
  });
});
