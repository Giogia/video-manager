import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Folder as FolderComponent } from './Folder.ui'

export default {
  title: 'Composed/Folder',
  component: FolderComponent,
  args:{...FolderComponent.defaultProps}
} as ComponentMeta<typeof FolderComponent>

const Template: ComponentStory<typeof FolderComponent> = (args) => <FolderComponent {...args} />

export const Folder = Template.bind({})
