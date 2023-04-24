import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Folder as FolderComponent } from '.'
import { composeError } from '../../utils/error'

export default {
  title: 'Composed/Folder',
  component: FolderComponent,
  argTypes: {
    error: { type: 'string' }
  },
  args: { ...FolderComponent.defaultProps }
} as ComponentMeta<typeof FolderComponent>

const Template: ComponentStory<typeof FolderComponent> = (args) =>
  <FolderComponent {...args}
    error={composeError(args.error)}
  />

export const Folder = Template.bind({})
