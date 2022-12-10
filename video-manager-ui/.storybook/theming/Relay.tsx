import React from "react"
import { DecoratorFn } from '@storybook/react'
import { RelayEnvironmentProvider } from 'react-relay'
import environment from '../../src/environment'

export const withRelayEnvironment: DecoratorFn = (Story) =>
  <RelayEnvironmentProvider environment={environment}>
    <Story />
  </RelayEnvironmentProvider>
