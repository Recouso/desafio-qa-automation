describe('Widgets -> Progress Bar', () => {
    beforeEach(() => {
        cy.visit('https://demoqa.com/')
        cy.intercept('GET', 'https://pagead2.googlesyndication.com/**', { statusCode: 204, body: '' })
        cy.intercept('GET', 'https://serving.stat-rock.com/**', { statusCode: 204, body: '' })
    })
    it('Validar que o valor da progress bar é menor ou igual a 25%, após apertar start para que chegue aos 100% e resetar a progress bar', () => {
        cy.get('.card.mt-4.top-card')
            .should('be.visible')
            .contains('Widgets')
            .click({ force: true }) //Necessário forçar, já que alguns ADs podem sobrepor o card, onde a automação pode se perder
        cy.contains('span.text', 'Progress Bar')
            .should('be.visible')
            .click()

        // Inicia o progresso
        cy.get('#startStopButton')
            .should('be.visible')
            .click()

        // Espera um tempo aleatório entre 0,5s e 2,5s (antes de 25%)
        const randomDelay = Math.floor(Math.random() * 2000) + 500 // Gera um tempo aleatório entre 500 ms e 2500 ms
        cy.wait(randomDelay)

        // Clica em "Stop" antes de atingir 25%
        cy.get('#startStopButton')
            .should('be.visible')
            .click()

        // Captura o valor atual e valida
        cy.get('#progressBar .progress-bar')
            .invoke('attr', 'aria-valuenow')
            .then((value) => {
                const progress = parseInt(value, 10)
                cy.log(`Progresso atual: ${progress}%`)
                expect(progress).to.be.at.most(25)
            })
        // Depois de validar que o valor é menor ou igual a 25%, clica novamente em Start pra chegar a 100%
        cy.get('#startStopButton').click()

        // Aguarda 100% e reset
        cy.get('#progressBar .progress-bar', { timeout: 10000 })
            .should('have.attr', 'aria-valuenow', '100')

        cy.wait(1000)    // tive que colocar essa pausa, porque a automação se perdia e clicava no botão de start e iniciava a progress bar novamente

        cy.get('#resetButton')
            .should('be.visible')
            .click()
       
        // Confirma que resetou
        cy.get('#progressBar .progress-bar')
            .should('have.attr', 'aria-valuenow', '0')
            .and('contain.text', '0%')
    })


})