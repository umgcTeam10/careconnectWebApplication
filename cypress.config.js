import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://127.0.0.1:4173',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx}',
    supportFile: false,
    video: false,
  },
  viewportWidth: 1280,
  viewportHeight: 900,
});
