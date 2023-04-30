import React from "react"
import { Decorator } from '@storybook/react'
import { RelayEnvironmentProvider } from 'react-relay'
import environment from '../../src/environment'

export const withRelayEnvironment: Decorator = (Story) =>
  <RelayEnvironmentProvider environment={environment}>
    <Story />
  </RelayEnvironmentProvider>
