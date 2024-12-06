import type { CodegenConfig } from '@graphql-codegen/cli'
import { defineConfig } from '@eddeee888/gcg-typescript-resolver-files'
 
const config: CodegenConfig = {
   // schema: './src/schema/base.graphql',
   schema: 'src/schema/typeDefs.ts',
   // documents: ['src/**/*.tsx'],
   
   generates: {
      './src/gql-client/': {
          preset: 'client',
      },
    //   './src/gql-server/resolvers-types.ts': {
    //   plugins: ['typescript', 'typescript-resolvers'],
    // },
    './src/gql-server': defineConfig({
      
      typesPluginsConfig: {
        contextType: '@/lib/resolvers#Context',
      },
      scalarsOverrides: {
        ID: {
          type: {
            input: 'string',
            output: 'string'
          }
        }
      }
    }),
  }
}
export default config