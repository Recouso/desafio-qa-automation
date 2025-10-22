// cypress.config.js
const { defineConfig } = require('cypress');
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
const { addCucumberPreprocessorPlugin } = require('@badeball/cypress-cucumber-preprocessor');
const { createEsbuildPlugin } = require('@badeball/cypress-cucumber-preprocessor/esbuild');

module.exports = defineConfig({
  e2e: {
    // Viewport padrão para evitar problemas de overlay/scroll nos testes de UI
    viewportHeight: 880,
    viewportWidth: 1280,

    // URL base para testes de UI (cy.visit) e fallback do cy.request
    baseUrl: 'https://demoqa.com',

    // Variáveis de ambiente usadas nos comandos de API (api.commands.js)
    env: {
      apiBaseUrl: 'https://demoqa.com',
    },

    // Aceita lado a lado: cenários Cucumber (.feature) e specs Cypress (.cy.js)
    specPattern: [
      'cypress/e2e/**/*.feature',
      'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    ],

    // Arquivo de suporte único que importa seus commands de UI e API
    supportFile: 'cypress/support/e2e.js',

    chromeWebSecurity: false,
    video: false,

    async setupNodeEvents(on, config) {
      // 1) registra o plugin do Cucumber (badeball)
      await addCucumberPreprocessorPlugin(on, config);

      // 2) registra o preprocessor esbuild (compatível com @bahmutov/cypress-esbuild-preprocessor@2.2.6)
      on('file:preprocessor', createBundler({
        plugins: [createEsbuildPlugin(config)],
      }));

      // 3) sempre retorne o config
      return config;
    },
  },
});
