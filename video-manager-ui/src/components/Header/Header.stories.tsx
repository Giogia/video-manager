import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { Header as HeaderComponent } from './Header.ui'

export default {
   title: 'Application/Header',
   component: HeaderComponent,
   args: {
      ...HeaderComponent.defaultProps,
      theme: 'light',
      handleTheme: action('change theme')
   }
} as ComponentMeta<typeof HeaderComponent>

const Template: ComponentStory<typeof HeaderComponent> = (args) => <HeaderComponent {...args} />

export const Header = Template.bind({})
