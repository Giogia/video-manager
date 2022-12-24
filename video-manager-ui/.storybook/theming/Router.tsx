import React from "react"
import { DecoratorFn } from '@storybook/react'
import { BrowserRouter } from "react-router-dom"

export const withRouter: DecoratorFn = (Story) =>
  <BrowserRouter>
    <Story />
  </BrowserRouter>
