import React from 'react'
import { GraphQLError } from 'graphql'

import { ButtonProps } from './Button.ui'
import { ButtonWithLoading, WithLoadingProps } from './Button.loading'
import { Snackbar } from '../Snackbar'

export interface WithErrorProps {
  /**
   * The error related to the button action
   */
  error?: GraphQLError
}

/**
 * Component Wrapper for error stage
 */
export const ButtonWithError = ({ error, ...props }: ButtonProps & WithLoadingProps & WithErrorProps) => (
   <>
      <ButtonWithLoading {...props} />
      <Snackbar error={error} />
   </>
)

ButtonWithError.defaultProps = {
   ...ButtonWithLoading.defaultProps,
}