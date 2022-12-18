import React from 'react'
import { graphql } from 'babel-plugin-relay/macro'
import { PreloadedQuery, usePreloadedQuery } from 'react-relay'

import { AppQuery } from './__generated__/AppQuery.graphql'

import { App } from './App.ui'

/**
 * Data fetching logic
 */
const query = (
  graphql`
    query AppQuery($path: String!, $name: String!) {
      getDirectory(input: {path: $path, name: $name}){
        id
        path
        ...Explorer_directory
      }
    }
  `
)

export interface WithFetchProps {
  /**
   * Query reference for data fetching
   */
  queryRef: PreloadedQuery<AppQuery>
}

/**
 * Component wrapper fetching data
 */
export const AppWithFetch = ({ queryRef }: WithFetchProps) => {
  const { getDirectory } = usePreloadedQuery<AppQuery>(query, queryRef)

  return (
    <App
      explorerRef={getDirectory}
    />
  )
}