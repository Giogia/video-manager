import { Variables } from 'react-relay'
import { GraphQLResponse, ObservableFromValue } from 'relay-runtime'
import { Environment, Network, RecordSource, Store } from 'relay-runtime'

export const GRAPHQL_URL = 'http://localhost:4000/graphql'

const store = new Store(new RecordSource())

const network = Network.create((
    operation: any,
    variables: Variables
): ObservableFromValue<GraphQLResponse> => {

    return fetch(GRAPHQL_URL, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query: operation.text,
            variables,
        }),
    }).then(response => response.json())
})

const environment = new Environment({
    network,
    store,
})

export default environment