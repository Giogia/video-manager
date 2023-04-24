import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Name as NameComponent } from '.'
import { composeError } from '../../utils/error'

export default {
  title: 'Primary/Name',
  component: NameComponent,
  argTypes: {
    error: { type: 'string' }
  },
  args: { ...NameComponent.defaultProps }
} as ComponentMeta<typeof NameComponent>

const Template: ComponentStory<typeof NameComponent> = (args) =>
  <NameComponent {...args}
    error={composeError(args.error)}
  />

export const Name = Template.bind({})
