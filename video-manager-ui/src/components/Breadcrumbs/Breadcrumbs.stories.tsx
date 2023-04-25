import React from 'react'
import { StoryFn, Meta } from '@storybook/react'
import { within } from '@storybook/testing-library'
import { expect } from '@storybook/jest'

import { Breadcrumbs } from './Breadcrumbs.ui'
import { destructurePath } from '../../utils/path'

export default {
   title: 'Composed/Breadcrumbs',
   component: Breadcrumbs,
   args: {
      path: '/Giovanni/Developer/Video%20Manager'
   }
} as Meta<typeof Breadcrumbs>

export const Playground: StoryFn<typeof Breadcrumbs> = (args) => (
   <Breadcrumbs {...args} />
)

Playground.play = async ({ args, canvasElement }) => {
   const canvas = within(canvasElement)

   const [currentDirectory, ...directories] = destructurePath(args.path)

   expect(canvas.getByRole('link', { name: currentDirectory })).toHaveAttribute('aria-disabled', 'true')

   directories.forEach(directory => {
      expect(canvas.getByRole('link', { name: directory || 'Home' })).toHaveAttribute('aria-disabled', 'false')
   })

   expect(within(canvas.getByRole('link', { name: 'Home' })).getByRole('button')).toBeVisible()
}