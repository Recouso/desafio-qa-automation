describe('Desafio QA Automation', () => {
  beforeEach(() => {
    cy.visit('https://demoqa.com/')
    cy.intercept('GET', 'https://pagead2.googlesyndication.com/**', { statusCode: 204, body: '' })
    cy.intercept('GET', 'https://serving.stat-rock.com/**', { statusCode: 204, body: '' })
  })

  it('Valida que a mensagem "This is a sample page" é mostrada ao clicar em Browser Windows -> New Window', () => {
    // Acessa a home
    cy.visit('https://demoqa.com/')

    // Entra em "Alerts, Frame & Windows"
    cy.contains('.card-body h5', 'Alerts, Frame & Windows')
      .scrollIntoView()
      .click({ force: true })

    // Clica em "Browser Windows"
    cy.contains('span.text', 'Browser Windows')
      .should('be.visible')
      .click()

    // Intercepta o window.open (antes do clique)
    cy.window().then((win) => {
      cy.stub(win, 'open').as('windowOpen')
    })

    // Clica no botão que abriria uma "nova janela"
    cy.get('#windowButton').should('be.visible').click()

    // Verifica que o window.open foi chamado
    cy.get('@windowOpen').should('be.called').then((stub) => { //como o cypress não consegue tratar janelas abertas no meio do teste, tive que validar de outra forma, utilizando o stub para extrair a URL aberta
      const openedUrl = stub.args[0][0] //aqui contem a URL passada no window.open
      const fullUrl = openedUrl.startsWith('http')
        ? openedUrl
        : `https://demoqa.com${openedUrl}`

      // Abre o conteúdo da "nova janela" na mesma aba
      cy.visit(fullUrl)
    })

    // Valida a mensagem da página aberta
    cy.contains('This is a sample page').should('be.visible')

    // "Fecha" a nova janela simulando o retorno à página anterior
    cy.visit('https://demoqa.com/browser-windows')

    // Valida o retorno para página anterior
    cy.url().should('include', '/browser-windows')
    cy.get('#windowButton').should('be.visible')
  })

  

  })