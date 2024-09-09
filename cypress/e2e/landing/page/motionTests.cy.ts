describe('Component visibility tests', () => {

  const components = [
    'features',
    'how-it-works',
    'our-solutions',
    'vision',
    'about-us',
  ];

  components.forEach(component => {
    describe(`${component} visibility tests`, () => {
      it(`${component} should not be visible when there is no scroll at all`, { scrollBehavior: false }, () => {
        cy.visit('/');
        cy.get(`section#${component.toLowerCase()}`).find('p')
            .should('not.be.visible');
      });

      it(`${component} should be visible after scrolling`, () => {
        cy.visit('/');
        cy.scrollTo('bottom');
        cy.get(`section#${component.toLowerCase()}`).should('exist');
      });
    });
  });

});
