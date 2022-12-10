import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { Explorer as ExplorerComponent } from './Explorer.ui'
import { ExplorerError } from './Explorer.error'
import { ExplorerLoading } from './Explorer.loading'
import { Folder } from '../Folder'

export default {
  title: 'Composed/Explorer',
  component: ExplorerComponent,
  args: {
    ...ExplorerComponent.defaultProps,
    path: 'home/giovanni/developer/video-manager',
    content: Array.from({ length: 12 }).map(() => <Folder />),
  }
} as ComponentMeta<typeof ExplorerComponent>

const error = (
  <ExplorerError
    error={{ message: 'Failed to fetch' }}
    resetErrorBoundary={action('Try Again')}
  />
)

const loading = (
  <ExplorerLoading />
)

const Template: ComponentStory<typeof ExplorerComponent> = (args) =>
  args.error ? error :
    args.loading ? loading :
      <ExplorerComponent {...args} />

export const Explorer = Template.bind({})
