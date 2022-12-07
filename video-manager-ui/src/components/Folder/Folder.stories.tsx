import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Folder as FolderComponent } from './'

export default {
  title: 'Folder',
  component: FolderComponent,
} as ComponentMeta<typeof FolderComponent>

const Template: ComponentStory<typeof FolderComponent> = (args) => <FolderComponent {...args} />

export const Folder = Template.bind({})
