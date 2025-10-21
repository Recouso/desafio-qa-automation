🧩 Desafio QA Automation — Cypress (UI + API + Cucumber)

Projeto completo de automação de testes usando
Cypress 13, Cucumber (Badeball preprocessor) e Faker.

Cobre cenários de:

🧠 UI (site DemoQA
)

⚙️ API (Book Store API do DemoQA)

✅ Requisitos

Node.js: 18.x ou 20.x (recomendado LTS)
Verifique:

node -v
npm -v


Git instalado

Compatível com macOS / Windows / Linux

⚠️ Em ambientes corporativos com proxy/SSL, veja a seção Solução de Problemas
.

🚀 Passo a passo para rodar localmente
1️⃣ Clone o repositório
git clone <URL_DO_SEU_REPO>
cd desafio-qa-automation

2️⃣ Instale as dependências
npm ci
# ou
npm install

3️⃣ Crie o arquivo de variáveis do Cypress

Crie o arquivo cypress.env.json na raiz do projeto com o conteúdo:

{
  "apiBaseUrl": "https://demoqa.com"
}


Esse valor é usado pelos comandos customizados (cy.apiGet, cy.apiPost, cy.apiDelete).

🧪 Execução dos testes
▶️ Abrir o Cypress (modo interativo)
npm run open
# ou
npx cypress open


Selecione E2E Testing e escolha o navegador.
Você verá todos os testes disponíveis:

UI com Cucumber → .feature

UI/API tradicionais → .cy.js

⚡ Rodar em modo headless (linha de comando)
🔹 Todos os testes (UI + API + Cucumber)
npm run test:all
# ou
npx cypress run --spec "cypress/e2e/**/*.{feature,cy.js}"

🔹 Somente UI (Cucumber)
npm run test:ui
# ou
npx cypress run --spec "cypress/e2e/ui/**/*.feature"

🔹 Somente API
npm run test:api
# ou
npx cypress run --spec "cypress/e2e/api/**/*.cy.js"

📜 Scripts (package.json)

Certifique-se de ter os seguintes scripts configurados:

"scripts": {
  "open": "cypress open",
  "cy:open": "cypress open",
  "cy:run": "cypress run",
  "test:all": "cypress run --spec 'cypress/e2e/**/*.{feature,cy.js}'",
  "test:ui": "cypress run --spec 'cypress/e2e/ui/**/*.feature'",
  "test:api": "cypress run --spec 'cypress/e2e/api/**/*.cy.js'"
}

🧭 Estrutura do projeto
cypress/
  e2e/
    ui/
      features/                 # arquivos .feature (Gherkin)
      stepDefinitions/          # *.steps.js
      specs/                    # specs UI não-Cucumber
      pages/                    # Page Objects leves
      selectors/                # data-testid / data-cy mapeados
    api/
      bookstore/                # specs da API Book Store
  fixtures/
    data/
      account.factory.js        # geração de dados Faker
  support/
    commands/
      api.commands.js           # cy.apiGet/Post/Delete
      ui.commands.js            # comandos UI (selectDate, etc)
    e2e.js                      # importa commands e configura hooks
cypress.config.js               # aceita .feature e .cy.js
cypress.env.json                # apiBaseUrl
package.json

🔧 Configuração essencial (Cucumber + Esbuild)

cypress.config.js (ou cypress.ui.config.js se separado):

const { defineConfig } = require('cypress')
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor')
const { addCucumberPreprocessorPlugin } = require('@badeball/cypress-cucumber-preprocessor')
const { createEsbuildPlugin } = require('@badeball/cypress-cucumber-preprocessor/esbuild')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://demoqa.com',
    specPattern: [
      'cypress/e2e/**/*.feature',
      'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}'
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


package.json

"cypress-cucumber-preprocessor": {
  "stepDefinitions": ["cypress/e2e/**/*.steps.{js,ts}"]
}

🧰 Comandos customizados (API)

cypress/support/commands/api.commands.js

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
    headers: { 'Content-Type': 'application/json', ...authHeaders(token) },
    failOnStatusCode: false,
    ...opts
  })
})


Importe no cypress/support/e2e.js:

import './commands/api.commands'
import './commands/ui.commands'

🔍 Dicas de debug

Visualizar requests/responses:

cy.intercept('POST', '/BookStore/v1/Books').as('addBooks')
cy.wait('@addBooks')


Logs personalizados:

Cypress.log({
  name: 'API POST',
  message: '/BookStore/v1/Books',
  consoleProps: () => ({ body, hasToken: !!token }),
})


Erros 4xx/5xx:
Use failOnStatusCode: false e valide res.status manualmente.

🧯 Solução de Problemas
Erro	Causa Provável	Solução
createEsbuildPlugin is not a function	Versão incompatível	Use @badeball/cypress-cucumber-preprocessor@23+ e @bahmutov/cypress-esbuild-preprocessor@2.2.6
Missing preprocessor event handlers	Falta await addCucumberPreprocessorPlugin() ou return config	Corrija no setupNodeEvents
Step implementation missing	Caminho incorreto de steps	Veja cypress-cucumber-preprocessor no package.json
cy.selectDate is not a function	Falta importar comandos UI	Adicione import './commands/ui.commands'
401 Unauthorized em APIs	Token não enviado	Verifique o header Authorization: Bearer <token>
Progress Bar reinicia	Sincronização	Adicione cy.wait(1000) antes do reset
Proxy / SSL	Restrição corporativa	Configurar CA ou npm config set strict-ssl false (temporário)
🧪 Dicas extras

Rodar tudo:

npm run test:all


Modo visual (debug):

npm run open


Clique nos comandos no painel do runner para ver request/response.

📄 Licença

Projeto desenvolvido para fins de desafio técnico
Autor: Gabriel Recouso
