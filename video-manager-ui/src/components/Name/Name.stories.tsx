import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Name } from './'

export default {
  title: 'Name',
  component: Name,
} as ComponentMeta<typeof Name>

const Template: ComponentStory<typeof Name> = (args) => <Name {...args} />

export const Base = Template.bind({})
