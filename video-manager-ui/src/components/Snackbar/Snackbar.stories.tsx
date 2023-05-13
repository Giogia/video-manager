import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import { StoryFn, Meta } from '@storybook/react'
import { within, userEvent } from '@storybook/testing-library'
import { expect } from '@storybook/jest'

import { Snackbar } from '.'
import { composeError } from '../../utils/error'

const SHOW_SNACKBAR_COMPONENT = 'Show Snackbar Component'
const DEFAULT_ERROR_MESSAGE = 'Default Error Message'

export default {
   title: 'Primary/Snackbar',
   component: Snackbar,
   argTypes: {
      error: { type: 'string' }
   }
} as Meta<typeof Snackbar>

export const Playground: StoryFn<typeof Snackbar> = (args) => {

   const [error, setError] = useState(composeError(args.error))

   useEffect(() => {
      if (args.error) setError(composeError(args.error))
   }, [args.error])

   return (
      <Box sx={{ textAlign: 'center' }}>
         <Chip
            clickable
            label={SHOW_SNACKBAR_COMPONENT}
            color="primary"
            variant="outlined"
            onClick={() => setError(composeError(DEFAULT_ERROR_MESSAGE))}
            sx={{ padding: 1 }}
         />
         <Snackbar {...args} error={error} />
      </Box>
   )
}

Playground.play = async ({ args, canvasElement }) => {

   const canvas = within(canvasElement)
   const button = canvas.getByText(SHOW_SNACKBAR_COMPONENT)

   userEvent.click(button)

   const message = await canvas.findByText(args.error as unknown as string || DEFAULT_ERROR_MESSAGE)
   const closeButton = await canvas.findByRole('button', { name: 'Close' })

   expect(message).toBeInTheDocument()
   expect(closeButton).toBeInTheDocument()
}