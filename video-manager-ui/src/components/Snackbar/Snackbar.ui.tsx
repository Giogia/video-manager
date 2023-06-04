import React, { useEffect, useState } from 'react'
import { GraphQLError } from 'graphql'
import SnackbarComponent from '@mui/material/Snackbar'
import Button from '@mui/material/Button'

import { getErrorMessage } from '../../utils/error'

export interface ErrorProps {
  /**
   * Error to display
   */
  error?: GraphQLError
}

/**
 * Primary UI component for user interaction through messages
 */
export const Snackbar = ({ error }: ErrorProps) => {

   const [open, setOpen] = useState(false)

   const message = getErrorMessage(error)

   useEffect(() => {
      if (error && message) setOpen(true)
   }, [error, message])

   const close = () => setOpen(false)

   return (
      <SnackbarComponent
         open={open}
         message={message}
         anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
         disableWindowBlurListener={true}
         onClose={close}
         autoHideDuration={4000}
         action={
            <Button
               color="inherit"
               size="small"
               onClick={close}
               sx={{ opacity: 0.75 }}
            >
               {'Close'}
            </Button>
         }
      />
   )
}
