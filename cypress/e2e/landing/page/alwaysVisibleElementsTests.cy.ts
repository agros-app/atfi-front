describe('template spec', () => {
    it('nav-bar exists', () => {
        cy.visit('/');
        cy.get('nav').should('exist');
    });

    it('video-section exists', () => {
        cy.visit('/');

        // el video secction tiene un atributo con id="video"
        cy.get('section#video').should('exist');

        cy.get('section#video')
            .find('video')
            .should('be.visible')
            .and(($video) => {
                // Verificar que el video se está reproduciendo (que el tiempo de reproducción sea mayor a 0)
                expect($video[0].currentTime).to.be.greaterThan(0);
            });

        // Verificar que uno de los títulos h1 sea visible
        // Como usamos framer-motion, el be.visible espera a que el elemento sea visible
        cy.get('section#video').find('h1').should('be.visible');
    });

    it('whatsapp component exists', () => {
        cy.visit('/');
        cy.get('div#whatsapp').should('exist');
    });

    it('footer exists', () => {
        cy.visit('/');
        cy.get('footer').should('exist');
    });

});
