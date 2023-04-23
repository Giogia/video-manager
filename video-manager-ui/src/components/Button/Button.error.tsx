import React, { useEffect, useState } from 'react'
import Snackbar from '@mui/material/Snackbar'

import { ButtonProps } from './Button.ui'
import { ButtonWithLoading } from './Button.loading'

export interface WithErrorProps {
  /**
   * The error related to the button action
   */
  error?: any
}

/**
 * Component Wrapper for error stage
 */
export const ButtonWithError = ({ error, ...props }: ButtonProps & WithErrorProps) => {

  const [open, setOpen] = useState(false)

  const [{ message }] = error?.source?.errors || [{}]

  useEffect(() => {
    if (message) setOpen(true)
  }, [message])

  return <>
    <ButtonWithLoading {...props} />
    {message &&
      <Snackbar
        open={open}
        message={message}
        anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
        disableWindowBlurListener={true}
        onClose={() => setOpen(false)}
        autoHideDuration={4000}
      />
    }
  </>
}

ButtonWithError.defaultProps = {
  ...ButtonWithLoading.defaultProps,
}