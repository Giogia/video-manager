import env from "react-dotenv"
import { Variables } from 'react-relay'
import { CacheConfig, GraphQLResponse, ObservableFromValue, RequestParameters, UploadableMap } from 'relay-runtime'
import { Environment, Network, RecordSource, Store } from 'relay-runtime'

const store = new Store(new RecordSource())

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

    return fetch(env.GRAPHQL_URL, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            ...!uploadables && { 'Content-Type': 'application/json' }
        },
        body
    }).then(response => response.json())
})

const environment = new Environment({
    network,
    store,
})

export default environment