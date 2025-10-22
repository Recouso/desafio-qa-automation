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
    "open:all": "cypress open --e2e",
    "test:ui": "cypress run --spec 'cypress/e2e/ui/**/*.{feature,cy.js}'",
    "test:api": "cypress run --spec 'cypress/e2e/api/**/*.cy.js'",
    "test:all": "cypress run --spec 'cypress/e2e/**/*.{feature,cy.js}'"
  }
```

---

## 🧾 Licença

📜 Projeto desenvolvido para **fins de desafio técnico**.  
👨‍💻 Autor: **Gabriel Recouso**  
🔗 [DemoQA.com](https://demoqa.com/)
