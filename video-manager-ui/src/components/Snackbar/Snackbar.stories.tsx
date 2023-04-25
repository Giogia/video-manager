import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Snackbar as SnackbarComponent } from '.'
import { composeError } from '../../utils/error'

export default {
   title: 'Primary/Snackbar',
   component: SnackbarComponent,
   argTypes: {
      error: { type: 'string' }
   }
} as ComponentMeta<typeof SnackbarComponent>

const Template: ComponentStory<typeof SnackbarComponent> = (args) => {

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
         <SnackbarComponent {...args} error={error} />
      </Box>
   )
}

export const Snackbar = Template.bind({})