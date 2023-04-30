import React from "react"
import { Decorator } from "@storybook/react"
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

export const withDnd: Decorator = (Story) =>
  <DndProvider backend={HTML5Backend}>
    <Story />
  </DndProvider>
