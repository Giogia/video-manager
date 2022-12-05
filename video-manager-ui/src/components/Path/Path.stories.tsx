import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Path } from '.'

export default {
  title: 'Path',
  component: Path,
  args:{
    path: 'home/giovanni/developer/video-manager'
  }
} as ComponentMeta<typeof Path>

const Template: ComponentStory<typeof Path> = (args) => <Path {...args} />

export const Base = Template.bind({})

