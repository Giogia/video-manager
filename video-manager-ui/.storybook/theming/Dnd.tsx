import React from "react"
import { Decorator } from "@storybook/react"
import { DndProvider } from 'react-dnd-multi-backend'
import { HTML5toTouch } from 'rdndmb-html5-to-touch'

export const withDnd: Decorator = (Story) =>
  <DndProvider options={HTML5toTouch}>
    <Story />
  </DndProvider>
