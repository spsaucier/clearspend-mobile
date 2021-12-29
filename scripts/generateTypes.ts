/* eslint-disable import/no-extraneous-dependencies */
const { resolve } = require('path');
const { generateApi } = require('swagger-typescript-api');

const baseUrl = 'https://api.capital.dev.tranwall.net/v3/api-docs';

generateApi({
  url: baseUrl,
  name: 'capital.ts',
  output: resolve(__dirname, '../src/generated'),
  generateClient: false,
  prettier: true,
});
