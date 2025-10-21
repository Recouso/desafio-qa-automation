# 🧩 Desafio QA Automation — Cypress + Cucumber + API/UI

![Cypress](https://img.shields.io/badge/Cypress-13.12.0-17202C?style=flat&logo=cypress)
![Node](https://img.shields.io/badge/Node.js-18%2B-026E00?style=flat&logo=node.js)
![Cucumber](https://img.shields.io/badge/Cucumber-BDD-2ECC71?style=flat&logo=cucumber)
![Faker](https://img.shields.io/badge/Faker-Data%20Generator-1E90FF?style=flat)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

> Projeto completo de **automação de testes** utilizando **Cypress 13**, **Cucumber (Badeball)** e **Faker.js**.  
> Inclui testes **UI (front-end)** e **API (Book Store API)** da [DemoQA](https://demoqa.com/).

---

## ⚙️ Tecnologias utilizadas

| Tipo | Ferramenta | Descrição |
|------|-------------|------------|
| 🧪 Test Runner | **Cypress** | Framework principal de automação |
| 🥒 BDD | **Cucumber (Badeball)** | Escrita de cenários Gherkin |
| 🔐 API Testing | **Cypress Request + Commands** | Custom commands com Bearer Token |
| 🧠 Mock Data | **@faker-js/faker** | Geração de dados dinâmicos |
| ⚡ Build | **Esbuild Preprocessor** | Compilação para Cucumber |
| 🌐 Base | **DemoQA** | Site-alvo e Book Store API |

---

## ✅ Requisitos

- **Node.js:** 18.x ou 20.x (recomendado LTS)
  ```bash
  node -v
  npm -v
  ```
- **Git:** instalado
- Compatível com **macOS / Windows / Linux**

> ⚠️ Ambientes corporativos com proxy/SSL — veja [💡 Solução de Problemas](#-solução-de-problemas).

---

## 🚀 Instalação e execução

### 1️⃣ Clone o repositório
```bash
git clone https://github.com/<seu-usuario>/desafio-qa-automation.git
cd desafio-qa-automation
```

### 2️⃣ Instale as dependências
```bash
npm ci
# ou
npm install
```

### 3️⃣ Configure variáveis de ambiente
Crie o arquivo `cypress.env.json` na raiz do projeto:
```json
{
  "apiBaseUrl": "https://demoqa.com"
}
```

---

## 🧪 Execução dos testes

### 🖥️ Modo interativo (Cypress GUI)
```bash
npm run open
# ou
npx cypress open
```

> Selecione **E2E Testing**, escolha o navegador e veja todos os testes disponíveis:
> - 🎬 UI com **Cucumber** → `.feature`
> - ⚙️ API/UI tradicionais → `.cy.js`

---

### ⚡ Modo headless (CLI)

#### Rodar **todos os testes (UI + API + Cucumber)**
```bash
npm run test:all
```

#### Somente **UI (Cucumber)**
```bash
npm run test:ui
```

#### Somente **API**
```bash
npm run test:api
```

📦 *Scripts definidos no `package.json`:*
```json
"scripts": {
  "open": "cypress open",
  "cy:open": "cypress open",
  "cy:run": "cypress run",
  "test:all": "cypress run --spec 'cypress/e2e/**/*.{feature,cy.js}'",
  "test:ui": "cypress run --spec 'cypress/e2e/ui/**/*.feature'",
  "test:api": "cypress run --spec 'cypress/e2e/api/**/*.cy.js'"
}
```

---

## 🧭 Estrutura de pastas

```
cypress/
  e2e/
    ui/
      features/          # Arquivos .feature (Gherkin)
      stepDefinitions/   # Steps Cucumber
      specs/             # Testes UI tradicionais
      pages/             # Page Objects (POs leves)
      selectors/         # Mapeamento data-testid/data-cy
    api/
      bookstore/         # Testes Book Store API
  fixtures/
    data/
      account.factory.js # Geração de dados faker
  support/
    commands/
      api.commands.js    # cy.apiGet, cy.apiPost, cy.apiDelete
      ui.commands.js     # Comandos de suporte UI
    e2e.js               # Registro dos comandos
cypress.config.js
cypress.env.json
package.json
```

---

## 🔧 Configuração essencial (Cucumber + Esbuild)

**cypress.config.js**
```js
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
```

**package.json**
```json
"cypress-cucumber-preprocessor": {
  "stepDefinitions": ["cypress/e2e/**/*.steps.{js,ts}"]
}
```

---

## 🧰 Comandos customizados de API

**cypress/support/commands/api.commands.js**
```js
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
```

**Importe em `cypress/support/e2e.js`:**
```js
import './commands/api.commands'
import './commands/ui.commands'
```

---

## 🔍 Debug e Logs

💬 **Interceptar requisições**
```js
cy.intercept('POST', '/BookStore/v1/Books').as('addBooks')
cy.wait('@addBooks')
```

🧾 **Logs personalizados**
```js
Cypress.log({
  name: 'API POST',
  message: '/BookStore/v1/Books',
  consoleProps: () => ({ body, hasToken: !!token }),
})
```

🚫 **Erros 4xx/5xx**
Use:
```js
failOnStatusCode: false
```
e valide manualmente:
```js
expect(res.status).to.eq(400)
```

---

## 🧯 Solução de Problemas

| Erro | Causa provável | Solução |
|------|----------------|----------|
| ❌ `createEsbuildPlugin is not a function` | Versão incompatível | Use `@badeball/cypress-cucumber-preprocessor@23+` e `@bahmutov/cypress-esbuild-preprocessor@2.2.6` |
| ⚙️ `Missing preprocessor event handlers` | Falta `await addCucumberPreprocessorPlugin()` ou `return config` | Ajuste no `setupNodeEvents` |
| 🧩 `Step implementation missing` | Caminho incorreto de steps | Corrija o glob em `package.json` |
| ⛔ `cy.selectDate is not a function` | Falta importar `ui.commands` | Corrija o `support/e2e.js` |
| 🔑 `401 Unauthorized` | Token não enviado | Verifique o header `Authorization: Bearer <token>` |
| ⏱️ Progress Bar reinicia | Sincronização incorreta | Adicione `cy.wait(1000)` antes do reset |
| 🌐 SSL corporativo | Certificados internos | Configure CA corporativa ou `npm config set strict-ssl false` *(temporário)* |

---

## 🧠 Dicas extras

| Ação | Comando |
|------|----------|
| Rodar tudo | `npm run test:all` |
| Modo visual | `npm run open` |
| Logs detalhados | Verifique os comandos no **painel esquerdo** do Cypress Runner |
| Relatórios | Ative com `--reporter mochawesome` (opcional) |

---

## 🧾 Licença

📜 Projeto desenvolvido para **fins de desafio técnico**.  
👨‍💻 Autor: **Gabriel Recouso**  
🔗 [DemoQA.com](https://demoqa.com/)
