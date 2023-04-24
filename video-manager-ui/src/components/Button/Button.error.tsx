import React from 'react'

import { ButtonProps } from './Button.ui'
import { ButtonWithLoading } from './Button.loading'
import { Snackbar } from '../Snackbar'

export interface WithErrorProps {
  /**
   * The error related to the button action
   */
  error?: any
}

/**
 * Component Wrapper for error stage
 */
export const ButtonWithError = ({ error, ...props }: ButtonProps & WithErrorProps) => (
  <>
    <ButtonWithLoading {...props} />
    <Snackbar error={error} />
  </>
)

ButtonWithError.defaultProps = {
  ...ButtonWithLoading.defaultProps,
}