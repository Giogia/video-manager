import React from 'react'
import env from "react-dotenv"
import { loadQuery } from 'react-relay'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

import ExplorerSchema, { ExplorerQuery } from './components/Explorer/__generated__/ExplorerQuery.graphql'

import environment from './environment'
import { App } from './App.ui'

const appQueryRef = loadQuery<ExplorerQuery>(environment, ExplorerSchema, {
  path: window.location.pathname,
  name: env.DEFAULT_FOLDER
})

/**
 * Component wrapper handling route data
 */
export const AppWithRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="*" element={
        <App explorerRef={appQueryRef} />
      } />
      {/* <Route path="*" element={
        <Navigate to="/" replace />
      } /> */}
    </Routes>
  </BrowserRouter>
)