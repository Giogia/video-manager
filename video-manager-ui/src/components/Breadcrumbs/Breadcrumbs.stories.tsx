import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Breadcrumbs as BreadcrumbsComponent } from '.'

export default {
  title: 'Breadcrumbs',
  component: BreadcrumbsComponent,
  args: {
    path: 'home/giovanni/developer/video-manager'
  }
} as ComponentMeta<typeof BreadcrumbsComponent>

const Template: ComponentStory<typeof BreadcrumbsComponent> = (args) => <BreadcrumbsComponent {...args} />

export const Breadcrumbs = Template.bind({})
