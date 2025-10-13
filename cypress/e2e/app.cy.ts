describe('test TOTVS', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should render select and switch', () => {
    cy.get('ui-select').should('exist');
    cy.get('ui-switch').should('exist');
  });

  it('should toggle switch', () => {
    cy.get('button[role="switch"]').as('switch');

    cy.get('@switch').should('have.attr', 'aria-checked', 'false');
    cy.get('@switch').click();
    cy.get('@switch').should('have.attr', 'aria-checked', 'true');
  });

  it('should open select and pick first option', () => {
    cy.get('.select-trigger').click();
    cy.get('.select-options li').first().click();
    cy.get('.select-trigger').should('contain.text', 'Opção 1');
  });
});
