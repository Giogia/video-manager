import React from 'react'
import { createRoot } from 'react-dom/client'
import { RelayEnvironmentProvider } from 'react-relay'
import { DndProvider } from 'react-dnd-multi-backend'
import { HTML5toTouch } from 'rdndmb-html5-to-touch'

import environment from './environment'
import { App } from './App'

import './index.css'

const root = createRoot(
  document.getElementById('root') as HTMLElement
)

root.render(
  <React.StrictMode>
    <RelayEnvironmentProvider environment={environment}>
      <DndProvider options={HTML5toTouch}>
        <App />
      </DndProvider>
    </RelayEnvironmentProvider>
  </React.StrictMode>
)
