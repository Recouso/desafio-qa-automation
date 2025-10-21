describe('Desafio QA Automation', () => {
    beforeEach(() => {
        cy.visit('https://demoqa.com/')
        cy.intercept('GET', 'https://pagead2.googlesyndication.com/**', { statusCode: 204, body: '' })
        cy.intercept('GET', 'https://serving.stat-rock.com/**', { statusCode: 204, body: '' })
    })
    it('Colocando os elementos na ordem crescente utilizando métodos de drag and drop', () => {
        cy.get('.card.mt-4.top-card')
            .should('be.visible')
            .contains('Interactions')
            .click({ force: true }) //Necessário forçar, já que alguns ADs podem sobrepor o card, onde a automação pode se perder
        cy.contains('span.text', 'Sortable')
            .should('be.visible')
            .click()

    })
})