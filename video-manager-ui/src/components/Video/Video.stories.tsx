import React from 'react'
import Box from '@mui/material/Box'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Video as VideoComponent } from './Video.ui'

import horizontal from './__assets__/horizontal.mov'
import vertical from './__assets__/vertical.mov'

const video = Math.random() > 0.65 ? vertical : horizontal

export default {
   title: 'Composed/Video',
   component: VideoComponent,
   args: { ...VideoComponent.defaultProps, source: video }
} as ComponentMeta<typeof VideoComponent>

const Template: ComponentStory<typeof VideoComponent> = (args) => <VideoComponent {...args} />

export const Video = Template.bind({})

Video.decorators = [(Story) => (
   <Box position='relative' height={200}>
      <Story />
   </Box>
)]