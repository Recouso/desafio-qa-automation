const { defineConfig } = require('cypress')
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor')
const { addCucumberPreprocessorPlugin } = require('@badeball/cypress-cucumber-preprocessor')
const { createEsbuildPlugin } = require('@badeball/cypress-cucumber-preprocessor/esbuild')

module.exports = defineConfig({
  e2e: {
    viewportHeight: 880, //Necessário já que muitos problemas com overlays e scrow down e up
    viewportWidth: 1280, //Necessário já que muitos problemas com overlays e scrow down e up
    async setupNodeEvents(on, config) {
      // 1) registra o plugin do Cucumber
      await addCucumberPreprocessorPlugin(on, config)

      // 2) registra o preprocessor esbuild (compatível com a v2.2.6)
      on('file:preprocessor', createBundler({
        plugins: [createEsbuildPlugin(config)],
      }))

      // 3) NÃO usar config.env.stepDefinitions na v23
      return config
    },

    // aceita .feature e .cy.js lado a lado
    specPattern: [
      'cypress/e2e/ui/**/*.feature',
      'cypress/e2e/ui/**/*.cy.{js,jsx,ts,tsx}',
    ],

    supportFile: 'cypress/support/e2e.js',
    baseUrl: 'https://demoqa.com',
    chromeWebSecurity: false,
    video: false,
  },
})
