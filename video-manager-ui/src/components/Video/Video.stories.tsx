import React from 'react'
import Box from '@mui/material/Box'
import { StoryFn, Meta } from '@storybook/react'

import { Video } from './Video.ui'

import horizontal from './__assets__/horizontal.mov'
import vertical from './__assets__/vertical.mov'

const video = Math.random() > 0.65 ? vertical : horizontal

export default {
   title: 'Composed/Video',
   component: Video,
   args: { ...Video.defaultProps, source: video },
   decorators: [(Story) => (
      <Box position='relative' height={200}>
         <Story />
      </Box>
   )]
} as Meta<typeof Video>

export const Playground: StoryFn<typeof Video> = (args) => (
   <Video {...args} />
)