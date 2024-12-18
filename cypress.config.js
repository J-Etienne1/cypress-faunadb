const dotenv = require('dotenv');
dotenv.config();

const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // Load the environment variable
      config.env.FAUNA_SECRET = process.env.FAUNA_SECRET;
      return config;
    },
  },
});
