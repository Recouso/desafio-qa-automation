const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://demoqa.com', // usado como fallback pelo cy.request
    env: {
      apiBaseUrl: 'https://demoqa.com', // usado explicitamente nos comandos
    },
    setupNodeEvents(on, config) {
      return config;
    },
  },
});
