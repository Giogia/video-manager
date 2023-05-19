import env from 'react-dotenv'
import { Variables } from 'react-relay'
import { CacheConfig, GraphQLResponse, ObservableFromValue, RequestParameters, UploadableMap } from 'relay-runtime'
import { Environment, Network, RecordSource, Store } from 'relay-runtime'

/**
 * The store instance for managing the application's data.
 */
const store = new Store(new RecordSource())

/**
 * The network implementation for making GraphQL requests.
 *
 * @param operation - The GraphQL request operation.
 * @param variables - The variables for the GraphQL request.
 * @param cacheConfig - The cache configuration for the request.
 * @param uploadables - Optional uploadable files for the request.
 * @returns An Observable representing the response from the GraphQL request.
 */
const network = Network.create((
   operation: RequestParameters,
   variables: Variables,
   cacheConfig: CacheConfig,
   uploadables: UploadableMap | null | undefined
): ObservableFromValue<GraphQLResponse> => {

   let body

   const { video } = uploadables || {}

   if (!video) {

      body = JSON.stringify({
         query: operation.text,
         variables
      })

   } else {

      body = new FormData()

      body.append('operations', JSON.stringify({
         query: operation.text,
         variables
      }))

      body.append('map', JSON.stringify({
         'video': ['variables.video']
      }))

      body.append('video', video, video.name)
   }

   return fetch(
      `${env.SERVER_URL}/graphql`,
      {
         method: 'POST',
         headers: {
            'Accept': 'application/json',
            ...!uploadables && { 'Content-Type': 'application/json' }
         },
         body
      }
   ).then(response => response.json())
})

/**
 * The environment instance for holding the network and store.
 */
const environment = new Environment({
   network,
   store,
})

export default environment