import React from 'react'
import Box from '@mui/material/Box'
import { StoryFn, Meta } from '@storybook/react'
import { userEvent, within } from '@storybook/testing-library'
import { expect } from '@storybook/jest'

import { Video } from '.'

import horizontal from './__assets__/horizontal.mov'
import vertical from './__assets__/vertical.mov'
import { formatSize } from '../../utils/size'

const video = Math.random() > 0.65 ? vertical : horizontal

export default {
   title: 'Composed/Video',
   component: Video,
   args: { ...Video.defaultProps, source: video },
   decorators: [(Story) => (
      <Box position='relative' height={200}>
         <Story />
      </Box>
   )]
} as Meta<typeof Video>

export const Playground: StoryFn<typeof Video> = (args) => (
   <Video {...args} />
)

Playground.play = async ({ args, canvasElement }) => {
   
   const canvas = within(canvasElement)

   if (!args.loading) {

      const video = canvas.getByRole('video')
      const name = canvas.getByText(args.name)
      const size = canvas.getByText(formatSize(args.size))

      expect(name).toBeVisible()
      expect(size).toBeVisible()

      await userEvent.click(video)
      await sleep(4000)

      expect(name).toBeVisible()

      const closeButton = canvas.getByRole('button')

      expect(closeButton).toBeVisible()
      expect(closeButton.id).toEqual('close-button')

      await userEvent.click(closeButton)
      await sleep(2000)
   }
}

function sleep(ms: number) {
   return new Promise((resolve) => setTimeout(resolve, ms))
}