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

# 🧩 Requisitos para rodar o projeto

---

## 🟢 1️⃣ Node.js
- **Versão mínima:** `v18.0.0`  
- **Versão recomendada:** `v20.x LTS`  
- Cypress e o plugin **Esbuild** exigem Node ≥18.

Verifique sua versão:
```bash
node -v
```

📦 **Se não tiver o Node ou estiver com versão antiga:**

### 💻 macOS / Linux (via NVM)
```bash
# Instala o NVM (Node Version Manager)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# Recarrega o shell (feche e reabra o terminal ou rode:)
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"

# Instala e usa o Node LTS (20.x)
nvm install --lts
nvm use --lts

# Define como padrão
nvm alias default 'lts/*'
```

### 🪟 Windows (via Chocolatey + NVM)
```powershell
choco install nvm -y
nvm install 20
nvm use 20
```

> 🔗 Alternativamente, baixe direto do site oficial: [https://nodejs.org/en/download](https://nodejs.org/en/download)

---

## 🟠 2️⃣ NPM (Gerenciador de pacotes)
- **Recomendado:** `npm v9+`

Verifique:
```bash
npm -v
```

Atualize (caso esteja desatualizado):
```bash
npm i -g npm@latest
```

---

## 🔵 3️⃣ Cypress
- **Versão mínima testada:** `^13.6.0`  
- **Versão recomendada:** `^13.12.0`

Verifique:
```bash
npx cypress --version
```

Instale (caso não tenha):
```bash
npm i -D cypress@13.12.0
```

---

## 🟣 4️⃣ Cucumber + Esbuild (Plugins obrigatórios)

Esses pacotes permitem rodar os testes `.feature` (BDD com Gherkin):

| Pacote | Versão Recomendada | Função |
|--------|--------------------|--------|
| `@badeball/cypress-cucumber-preprocessor` | ^23.0.0 | Interpreta os arquivos `.feature` |
| `@bahmutov/cypress-esbuild-preprocessor` | ^2.2.6 | Faz o build dos steps |
| `esbuild` | ^0.19.0 | Motor rápido de transpile |

Instale/garanta as versões corretas:
```bash
npm i -D @badeball/cypress-cucumber-preprocessor@^23 @bahmutov/cypress-esbuild-preprocessor@^2.2.6 esbuild@^0.19
```

---

## 🧰 5️⃣ Outras dependências úteis

Essenciais para geração dinâmica de dados e manipulação de arrays:

| Pacote | Função |
|--------|--------|
| `@faker-js/faker` | Criação de usuários e dados aleatórios |
| `lodash` | Funções utilitárias (ex: `Cypress._.shuffle()`) |

Instale:
```bash
npm i -D @faker-js/faker lodash
```

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
---

## 🧾 Licença

📜 Projeto desenvolvido para **fins de desafio técnico**.  
👨‍💻 Autor: **Gabriel Recouso**  
🔗 [DemoQA.com](https://demoqa.com/)
