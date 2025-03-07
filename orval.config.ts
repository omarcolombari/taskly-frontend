import { defineConfig } from 'orval'

export default defineConfig({
  api: {
    input: './swagger.json',
    output: {
      target: './src/http/generated/api.ts',
      client: 'react-query',
      httpClient: 'fetch',
      clean: true,

      override: {
        fetch: {
          includeHttpResponseReturnType: false,
        },

        mutator: {
          path: './src/http/client.ts',
          name: 'http',
        },
      },
    },
  },
})
