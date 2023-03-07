import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Box from '@mui/material/Box'

import { Explorer as ExplorerComponent } from './Explorer.ui'
import { ExplorerError } from './Explorer.error'
import { ExplorerLoading } from './Explorer.loading'
import { FolderWithDrag as Folder } from '../Folder'
import { VideoWithDrag as Video } from '../Video'

// @ts-ignore
import video from '../Video/__assets__/video.mov'

export default {
  title: 'Composed/Explorer',
  component: ExplorerComponent,
  argTypes: {
    content: { control: false }
  },
  args: {
    ...ExplorerComponent.defaultProps,
    path: '/home/giovanni/developer/video-manager',
    content: Array.from({ length: 40 }).map(() => Math.random() > 0.65 ?
      <Video source={video} /> :
      <Folder />
    ),
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

Explorer.decorators = [(Story) => (
  <Box height={600}>
    <Story />
  </Box>
)]