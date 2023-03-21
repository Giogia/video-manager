import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Breadcrumbs as BreadcrumbsComponent } from './Breadcrumbs.ui'

export default {
  title: 'Composed/Breadcrumbs',
  component: BreadcrumbsComponent,
  args: {
    path: '/Home/Giovanni/Developer/Video%20Manager'
  }
} as ComponentMeta<typeof BreadcrumbsComponent>

const Template: ComponentStory<typeof BreadcrumbsComponent> = (args) => <BreadcrumbsComponent {...args} />

export const Breadcrumbs = Template.bind({})

