import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"

import { AppWithFetch } from './App.fetch'


/**
 * Component wrapper handling route data
 */
export const AppWithRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route
        path="*"
        element={<AppWithFetch />}
      />
    </Routes>
  </BrowserRouter>
)