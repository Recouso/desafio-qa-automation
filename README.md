Desafio QA Automation — Cypress (UI + API + Cucumber)

Projeto de automação de testes usando Cypress 13, Cucumber (Badeball preprocessor) e Faker.
Cobre cenários UI (DemoQA) e API (Book Store API do DemoQA).

✅ Requisitos

Node.js: 18.x ou 20.x (recomendado LTS)
Verifique com:

node -v
npm -v


Git para clonar o repositório

macOS/Windows/Linux

⚠️ Dica para empresas com proxy/SSL: veja a seção Solução de Problemas no final.

🚀 Passo a passo para rodar localmente

Clone o repositório

git clone <URL_DO_SEU_REPO>
cd desafio-qa-automation


Instale as dependências

npm ci
# (ou) npm install


Crie o arquivo de variáveis do Cypress
Na raiz do projeto, crie cypress.env.json com o conteúdo abaixo:

{
  "apiBaseUrl": "https://demoqa.com"
}


Isso é usado pelos comandos customizados de API (cy.apiGet, cy.apiPost, cy.apiDelete).

Abra o Cypress (modo interativo)

npm run open
# ou
npx cypress open


Selecione E2E Testing e escolha o navegador. Você verá todos os testes:

UI em .feature (Cucumber)

UI/API em .cy.js

Rodar em modo headless (CLI)

Todos os testes (UI + API + Cucumber):

npm run test:all
# ou
npx cypress run --spec "cypress/e2e/**/*.{feature,cy.js}"


Somente UI (Cucumber):

npm run test:ui
# ou
npx cypress run --spec "cypress/e2e/ui/**/*.feature"


Somente API:

npm run test:api
# ou
npx cypress run --spec "cypress/e2e/api/**/*.cy.js"


Os scripts acima estão no package.json. Se não estiverem, adicione:

"scripts": {
  "open": "cypress open",
  "cy:open": "cypress open",
  "cy:run": "cypress run",
  "test:all": "cypress run --spec 'cypress/e2e/**/*.{feature,cy.js}'",
  "test:ui": "cypress run --spec 'cypress/e2e/ui/**/*.feature'",
  "test:api": "cypress run --spec 'cypress/e2e/api/**/*.cy.js'"
}

🧭 Estrutura (resumo)

Pode variar levemente conforme seus arquivos, mas a organização segue algo como:

cypress/
  e2e/
    ui/
      features/                 # arquivos .feature (Gherkin)
      stepDefinitions/          # *.steps.js
      specs/                    # specs UI não-Cucumber (quando existirem)
      pages/                    # Page Objects (POs leves)
      selectors/                # mapeamento de data-testid/data-cy
    api/
      bookstore/                # specs de API Book Store
      ...                       # (outros serviços)
  fixtures/
    data/
      account.factory.js        # faker de credenciais
  support/
    commands/
      api.commands.js           # cy.apiGet/Post/Delete
      ui.commands.js            # comandos UI (selectDate, selectStateCity etc)
    e2e.js                      # importa os commands e configura hooks globais
cypress.config.js               # aceita .feature e .cy.js
cypress.env.json                # apiBaseUrl
package.json

🔧 Configuração essencial (Cucumber + Esbuild)

No cypress.config.js (ou cypress.ui.config.js se você separou), garanta:

const { defineConfig } = require('cypress')
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor')
const { addCucumberPreprocessorPlugin } = require('@badeball/cypress-cucumber-preprocessor')
const { createEsbuildPlugin } = require('@badeball/cypress-cucumber-preprocessor/esbuild')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://demoqa.com',
    specPattern: [
      'cypress/e2e/**/*.feature',
      'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    ],
    async setupNodeEvents(on, config) {
      await addCucumberPreprocessorPlugin(on, config)
      on('file:preprocessor', createBundler({
        plugins: [createEsbuildPlugin(config)],
      }))
      return config
    },
    chromeWebSecurity: false,
    video: false
  }
})


E no package.json, a configuração do Cucumber (se usada):

{
  "cypress-cucumber-preprocessor": {
    "stepDefinitions": [
      "cypress/e2e/**/*.steps.{js,ts}"
    ]
  }
}

🧰 Comandos customizados (API)

Em cypress/support/commands/api.commands.js:

const authHeaders = (token) => token ? { Authorization: `Bearer ${token}` } : {}

Cypress.Commands.add('apiPost', (path, body, token, opts = {}) => {
  return cy.request({
    method: 'POST',
    url: `${Cypress.env('apiBaseUrl')}${path}`,
    body,
    headers: { 'Content-Type': 'application/json', ...authHeaders(token), ...opts.headers },
    failOnStatusCode: false
  })
})

Cypress.Commands.add('apiGet', (path, token, opts = {}) => {
  return cy.request({
    method: 'GET',
    url: `${Cypress.env('apiBaseUrl')}${path}`,
    headers: { ...authHeaders(token), ...opts.headers },
    failOnStatusCode: false
  })
})

Cypress.Commands.add('apiDelete', (path, body, token, opts = {}) => {
  return cy.request({
    method: 'DELETE',
    url: `${Cypress.env('apiBaseUrl')}${path}`,
    body,
    headers: { 'Content-Type': 'application/json', ...authHeaders(token), ...opts.headers },
    failOnStatusCode: false,
    ...opts
  })
})


E importe tudo no cypress/support/e2e.js:

import './commands/api.commands'
import './commands/ui.commands'    // se estiver usando comandos UI

🧪 Como visualizar melhor os testes de API no cypress open

Use cy.intercept() para inspecionar requests/responses e cy.wait('@alias') para ver no runner.

Logs úteis:

cy.log('Body:', JSON.stringify(body))
Cypress.log({
  name: 'API POST',
  message: '/BookStore/v1/Books',
  consoleProps: () => ({ body, hasToken: !!token }),
})


Para cenários negativos, use failOnStatusCode: false e asserte o res.status manualmente.

🧯 Solução de Problemas
1) “createEsbuildPlugin is not a function”

Versão incompatível do preprocessor. Use:

@badeball/cypress-cucumber-preprocessor (v23+)

@bahmutov/cypress-esbuild-preprocessor (v2.2.6)

Confirme que importou createEsbuildPlugin de @badeball/.../esbuild.

2) “Missing preprocessor event handlers”

Faltou await addCucumberPreprocessorPlugin(on, config) e retornar config no setupNodeEvents.

3) “Step implementation missing”

O glob de steps não bate com a sua pasta.
Garanta:

"cypress-cucumber-preprocessor": {
  "stepDefinitions": ["cypress/e2e/**/*.steps.{js,ts}"]
}


e seus steps em cypress/e2e/.../*.steps.js.

4) cy.selectDate is not a function

Falta importar seus comandos UI em cypress/support/e2e.js.

5) Janela nova (UI)

O Cypress não controla múltiplas abas. Use cy.stub(win, 'open') e cy.visit(fullUrl).

6) Progress Bar reinicia

Adicione cy.wait(1000) antes do reset e aumente timeout para aguardar 100%.

7) 401 em APIs no cleanup

Verifique se apiDelete adiciona Authorization: Bearer <token>.

Se necessário, gere um novo token no after() e tente novamente.

8) Ambiente corporativo / SSL

Erro tipo “unable to get local issuer certificate” ao instalar Cypress:

(Não recomendado) npm config set strict-ssl false

Preferível: configurar CA corporativa corretamente (peça à TI).

🧪 Dicas de execução

Rodar tudo:

npm run test:all


Visual (debug):

npm run open


Logs no runner: clique nos comandos no painel esquerdo para ver request/response.

📄 Licença

Projeto para fins de desafio técnico
