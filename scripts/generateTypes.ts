import { resolve } from 'path';
import { generateApi } from 'swagger-typescript-api';

const baseUrl = 'https://api.capital.dev.tranwall.net/v3/api-docs';

generateApi({
  url: baseUrl,
  name: 'capital.ts',
  output: resolve(__dirname, '../src/generated'),
  generateClient: false,
}).then(() => console.log('Regenerated capital.ts'));
