import React from 'react'
import { loadQuery } from 'react-relay'
import { useLocation } from 'react-router-dom'

import ExplorerSchema, { ExplorerQuery } from '../components/Explorer/__generated__/ExplorerQuery.graphql'

import environment from '../environment'
import { App } from './App.ui'

/**
 * Initial query depending on route
 */
const appQueryRef = (path: string) => loadQuery<ExplorerQuery>(
  environment,
  ExplorerSchema,
  { path },
  { fetchPolicy: 'store-and-network' }
)

/**
 * Component wrapper fetching route data
 */
export const AppWithFetch = ({ ...props }) => {

  const { pathname } = useLocation()

  return (
    <App {...props}
      explorerQueryRef={appQueryRef(pathname)}
    />
  )
}