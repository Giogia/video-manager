import React from 'react'
import { createRoot } from 'react-dom/client'
import { RelayEnvironmentProvider } from 'react-relay'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import environment from './environment'
import { App } from './App'

import './index.css'

const root = createRoot(
  document.getElementById('root') as HTMLElement
)

root.render(
  <React.StrictMode>
    <RelayEnvironmentProvider environment={environment}>
      <DndProvider backend={HTML5Backend}>
        <App />
      </DndProvider>
    </RelayEnvironmentProvider>
  </React.StrictMode>
)
