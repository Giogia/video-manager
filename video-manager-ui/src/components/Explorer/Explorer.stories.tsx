import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Explorer as ExplorerComponent } from './'
import { Folder } from '../Folder'

export default {
  title: 'Explorer',
  component: ExplorerComponent,
  args: {
    path: 'home/giovanni/developer/video-manager'
  }
} as ComponentMeta<typeof ExplorerComponent>

const Template: ComponentStory<typeof ExplorerComponent> = (args) => <ExplorerComponent {...args} />

export const Explorer = Template.bind({})

Explorer.args = {
  content: Array.from({ length: 12 }).map(() => <Folder />)
}
