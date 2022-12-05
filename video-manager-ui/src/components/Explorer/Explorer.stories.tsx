import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Explorer } from './'
import { Folder } from '../Folder'

export default {
  title: 'Explorer',
  component: Explorer,
  args: {
    path: 'home/giovanni/developer/video-manager'
  }
} as ComponentMeta<typeof Explorer>

const Template: ComponentStory<typeof Explorer> = (args) => <Explorer {...args} />

export const Base = Template.bind({})
Base.args = {
  content: Array.from({ length: 12 }).map(() => <Folder />)
}
