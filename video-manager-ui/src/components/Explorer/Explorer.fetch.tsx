import React, { Suspense } from 'react'
import { graphql } from 'babel-plugin-relay/macro'
import { PreloadedQuery, usePreloadedQuery } from 'react-relay'
import { withErrorBoundary } from 'react-error-boundary'

import { ExplorerQuery } from './__generated__/ExplorerQuery.graphql'

import { Explorer } from '.'
import { ExplorerLoading } from './Explorer.loading'
import { ExplorerError } from './Explorer.error'
import { Folder } from '../Folder'

/**
 * Data fetching logic
 */
const query = (
    graphql`
    query ExplorerQuery($path: String!, $name: String!) {
      getDirectory(input: {path: $path, name: $name}){
        path
        children {
          name
        }
      }
    }
  `
)

interface WithFetchProps {
    /**
     * Query reference for data fetching
    */
    queryRef: PreloadedQuery<ExplorerQuery>
}

/**
 * Component wrapper fetching data
 */
export const ExplorerWithFetch = withErrorBoundary(({ queryRef }: WithFetchProps) => {
    const { getDirectory: { path, children } } = usePreloadedQuery<ExplorerQuery>(query, queryRef)

    return (
        <Suspense fallback={<ExplorerLoading />}>
            <Explorer
                path={path}
                content={
                    children.map(({ name }) =>
                        <Folder
                            defaultName={name}
                            key={name}
                        />
                    )
                }
            />
        </Suspense>
    )
}, {
    FallbackComponent: ExplorerError,
    onError(error, info) { }
}) 