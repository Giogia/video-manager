import React from 'react'
import { StoryFn, Meta } from '@storybook/react'
import { within } from '@storybook/testing-library'
import { expect } from '@storybook/jest'

import { Link as LinkComponent } from './Link.ui'
import { Link } from '.'
import { composeError } from '../../utils/error'

const [{ description }] = Object.values(LinkComponent).slice(-1)

export default {
   title: 'Primary/Link',
   component: Link,
   parameters: {
      docs: {
         description: {
            component: description
         }
      }
   },
   argTypes: {
      error: { type: 'string' }
   },
   args: {
      name: 'link',
      href: '/href',
      ...Link.defaultProps,
   }
} as Meta<typeof Link>

export const Playground: StoryFn<typeof Link> = (args) => (
   <Link {...args}
      error={composeError(args.error)}
   />
)

Playground.play = async ({ args, canvasElement }) => {

   const canvas = within(canvasElement)

   const link = canvas.getByRole('link', { name: args.name })

   expect(link).toBeVisible()
   expect(link).toHaveAttribute('href', args.href)
}