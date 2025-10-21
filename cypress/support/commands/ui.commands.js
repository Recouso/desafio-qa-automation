// Comando para selecionar qualquer data
Cypress.Commands.add('selectDate', (year, month, day) => {
  cy.get('#dateOfBirthInput').click()
  cy.get('.react-datepicker__year-select').select(year)
  cy.get('.react-datepicker__month-select').select(month)
  cy.get('.react-datepicker__day--002:not(.react-datepicker__day--outside-month)').click()
})

// Comando para selecionar qualquer arquivo
Cypress.Commands.add('uploadFile', (selector, fileName) => {
  cy.get(selector).selectFile(`cypress/fixtures/files/${fileName}`)
})

// Comando para selecionar qualquer estado e cidade disponível
Cypress.Commands.add('selectStateCity', (state, city) => {
  cy.get('#state').scrollIntoView().click()
  cy.get('#react-select-3-input').type(`${state}{enter}`)
  cy.get('#city').click()
  cy.get('#react-select-4-input').type(`${city}{enter}`)
})