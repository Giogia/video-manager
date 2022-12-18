import React from 'react'
import env from "react-dotenv"
import { loadQuery } from 'react-relay'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

import AppSchema, { AppQuery } from './__generated__/AppQuery.graphql'

import environment from './environment'
import { AppWithFetch } from './App.fetch'

const appQueryRef = loadQuery<AppQuery>(environment, AppSchema, {
  path: window.location.pathname,
  name: env.DEFAULT_FOLDER
})

/**
 * Component wrapper handling route data
 */
export const AppWithRouter = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <AppWithFetch queryRef={appQueryRef} />
        } />
        <Route path="*" element={
          <Navigate to="/" replace />
        } />
      </Routes>
    </BrowserRouter>
  )
}