import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Folder } from './'

export default {
  title: 'Folder',
  component: Folder,
} as ComponentMeta<typeof Folder>

const Template: ComponentStory<typeof Folder> = (args) => <Folder {...args} />

export const Base = Template.bind({})
