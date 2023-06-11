import React from 'react'
import { StoryFn, Meta } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Box from '@mui/material/Box'

import { Explorer } from './Explorer.ui'
import { ExplorerError } from './Explorer.error'
import { ExplorerLoading } from './Explorer.loading'
import { FolderWithDrag as Folder } from '../Folder'
import { VideoWithDrag as Video } from '../Video'

import horizontal from '../Video/__assets__/horizontal.mov'
import vertical from '../Video/__assets__/vertical.mov'

export default {
   title: 'Application/Explorer',
   component: Explorer,
   argTypes: {
      content: { control: false }
   },
   args: {
      ...Explorer.defaultProps,
      path: '/home/giovanni/developer/video-manager',
      content: Array.from({ length: 20 }).map((_, i) =>
         Math.random() < 0.15 ?
            <Video key={i} source={Math.random() > 0.5 ? vertical : horizontal} /> :
            <Folder key={i} />
      )
   },
   decorators: [(Story) => (
      <Box height={400}>
         <Story />
      </Box>
   )]
} as Meta<typeof Explorer>

const error = (
   <ExplorerError
      error={{ message: 'Failed to fetch' }}
      resetErrorBoundary={action('Try Again')}
   />
)

const loading = (
   <ExplorerLoading />
)

export const Playground: StoryFn<typeof Explorer> = (args) =>
   args.error ? error :
      args.loading ? loading :
         <Explorer {...args} />
