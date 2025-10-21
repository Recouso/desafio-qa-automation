describe('Desafio QA Automation', () => {
    beforeEach(() => {
        cy.visit('https://demoqa.com/')
        cy.intercept('GET', 'https://pagead2.googlesyndication.com/**', { statusCode: 204, body: '' })
        cy.intercept('GET', 'https://serving.stat-rock.com/**', { statusCode: 204, body: '' })
    })
    it('Submeter o formulário, garantindo que o popup foi aberto após o envio', () => {
        cy.get('.card.mt-4.top-card')
            .should('be.visible')
            .contains('Forms')
            .click({ force: true }) //Necessário forçar, já que alguns ADs podem sobrepor o card, onde a automação pode se perder
        cy.contains('span.text', 'Practice Form')
            .should('be.visible')
            .click()

        //Preenchendo o formulário
        cy.get('#firstName')
            .should('be.visible')
            .type('Gabriel')
            .should('have.value', 'Gabriel')
        cy.get('#lastName')
            .should('be.visible')
            .type('Recouso')
            .should('have.value', 'Recouso')
        cy.get('#userEmail')
            .should('be.visible')
            .type('gabriel.recouso@gmail.com')
            .should('have.value', 'gabriel.recouso@gmail.com')
        cy.contains('label', 'Male')
            .should('be.visible')
            .click()
        cy.get('#userNumber')
            .should('be.visible')
            .type(974054321)
            .should('have.value', '974054321')
        cy.get('#dateOfBirthInput')
            .should('be.visible')
            .click()
        cy.selectDate('1995', 'February', '2') //criado um comando de suporte para selecionar qualquer data
        cy.get('#subjectsInput')
            .should('be.visible')
            .type('Computer')
            .should('have.value', 'Computer')
        cy.contains('.subjects-auto-complete__option', 'Computer Science')
            .should('be.visible')
            .click()
        cy.contains('label', 'Reading')
            .should('be.visible')
            .click()
        cy.uploadFile('#uploadPicture', 'automationQaTest.txt') //criado um comando de suporte para selecionar qualquer arquivo
        cy.get('#currentAddress')
            .should('be.visible')
            .type('Rua Joaquim Marcelino Leite, 425')
            .should('have.value', 'Rua Joaquim Marcelino Leite, 425')
        cy.selectStateCity('Uttar Pradesh', 'Lucknow') //cirado um comando de suporte para selecionar qualquer estado e cidade
        cy.get('#submit')
            .should('be.visible')
            .click()

        cy.get('#example-modal-sizes-title-lg') //Validando o envio do formulário
            .should('be.visible')
            .and('have.text', 'Thanks for submitting the form')

        cy.get('#closeLargeModal') //Fechando o envio do formulário
            .should('be.visible')
            .click()

        cy.get('#example-modal-sizes-title-lg').should('not.exist') //Validando que o modal de sucesso foi fechado

        cy.get('#userForm').should('be.visible') //validando o estado pós-ação (retorno para a tela do Formulário em branco)
        cy.url().should('include', '/automation-practice-form')
    })
})