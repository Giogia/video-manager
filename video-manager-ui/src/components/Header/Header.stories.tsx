import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { Header as HeaderComponent } from '.'

export default {
  title: 'Header',
  component: HeaderComponent,
  args: {
    theme: 'light',
    handleTheme: action('change theme')
  }
} as ComponentMeta<typeof HeaderComponent>

const Template: ComponentStory<typeof HeaderComponent> = (args) => <HeaderComponent {...args} />

export const Header = Template.bind({})
