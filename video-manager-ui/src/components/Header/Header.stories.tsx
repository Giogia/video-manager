import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { Header } from '.'

export default {
  title: 'Header',
  component: Header,
  args: {
    theme: 'light',
    handleTheme: action('change theme')
  }
} as ComponentMeta<typeof Header>

const Template: ComponentStory<typeof Header> = (args) => <Header {...args} />

export const Base = Template.bind({})
