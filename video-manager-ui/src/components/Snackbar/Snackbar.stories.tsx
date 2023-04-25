import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import { StoryFn, Meta } from '@storybook/react'

import { Snackbar } from '.'
import { composeError } from '../../utils/error'

export default {
   title: 'Primary/Snackbar',
   component: Snackbar,
   argTypes: {
      error: { type: 'string' }
   }
} as Meta<typeof Snackbar>

export const Playground: StoryFn<typeof Snackbar> = (args) => {

   const [error, setError] = useState(composeError(args.error))

   return (
      <Box sx={{ textAlign: 'center' }}>
         <Chip
            clickable
            label="Show Snackbar Component"
            color="primary"
            variant="outlined"
            onClick={() => setError(composeError('Default Error Message.'))}
            sx={{ padding: 1 }}
         />
         <Snackbar {...args} error={error} />
      </Box>
   )
}