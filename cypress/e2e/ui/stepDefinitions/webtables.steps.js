import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor"
import { faker } from "@faker-js/faker"

let createdUsers = [] // memória temporária dos nomes criados


Given("que estou na página inicial do DemoQA", () => {
    cy.visit("https://demoqa.com/")
    cy.intercept("GET", "https://pagead2.googlesyndication.com/**", { statusCode: 204 })
    cy.intercept("GET", "https://serving.stat-rock.com/**", { statusCode: 204 })
})

//Acessar o submenu Web Tables
When("eu acesso o submenu Web Tables", () => {
    cy.get('.card.mt-4.top-card')
            .should('be.visible')
            .contains('Elements')
            .click({ force: true }) //Necessário forçar, já que alguns ADs podem sobrepor o card, onde a automação pode se perder
        cy.contains('span.text', 'Web Tables')
            .should('be.visible')
            .click()
})

//Criando 12 novos registros fakerizados
When("eu crio 12 novos registros com dados aleatórios", () => {
    cy.get('select[aria-label="rows per page"]').select('100') //como criaremos + de 10 registros, vamos expandir para não ter que mudar de página no meio do for

    for (let i = 0; i < 12; i++) {
        const firstName = faker.person.firstName()
        const lastName = faker.person.lastName()
        const email = faker.internet.email(firstName, lastName)
        const age = faker.number.int({ min: 20, max: 60 })
        const salary = faker.number.int({ min: 2000, max: 15000 })
        const department = faker.commerce.department()

        createdUsers.push(firstName) //guarda o nome do usuário criado

        cy.get("#addNewRecordButton").click()
        cy.get("#firstName").type(firstName)
        cy.get("#lastName").type(lastName)
        cy.get("#userEmail").type(email)
        cy.get("#age").type(age.toString())
        cy.get("#salary").type(salary.toString())
        cy.get("#department").type(department)
        cy.get("#submit").click()

        cy.contains(".rt-tr", firstName).should("be.visible") // validação rápida
    }
})

//Editando todos os 12 registros criados
When("eu edito cada registro criado adicionando o sufixo Editado", () => {
    createdUsers.forEach((name) => {
        cy.contains(".rt-tr", name).within(() => {
            cy.get('[id^="edit-record"]').click()
        })

        const newName = `${name}_Editado`

        cy.get("#firstName").clear().type(newName)
        cy.get("#submit").click()

        // atualiza na memória
        const index = createdUsers.indexOf(name)
        if (index !== -1) createdUsers[index] = newName

        cy.contains(".rt-tr", newName).should("be.visible")
    })
})

// Deletando todos os 12 registros criados
When("eu deleto todos os registros criados", () => {
    createdUsers.forEach((name) => {
        cy.contains(".rt-tr", name).within(() => {
            cy.get('[id^="delete-record"]').click({ force: true })
        })

        cy.contains(".rt-tr", name).should("not.exist")
    })
})

// Validação final
Then("nenhum dos registros deve estar visível na tabela", () => {
    createdUsers.forEach((name) => {
        cy.contains(".rt-tr", name).should("not.exist")
    })
})
