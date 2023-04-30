import React from 'react'

import { NameProps } from './Name.ui'
import { NameWithLoading, WithLoadingProps, } from './Name.loading'
import { Snackbar } from '../Snackbar'

export interface WithErrorProps {
  /**
   * The error related to the name action
   */
  error?: any
}

/**
 * Component Wrapper for error stage
 */
export const NameWithError = ({ error, ...props }: NameProps & WithLoadingProps & WithErrorProps) => (
   <>
      <NameWithLoading {...props} />
      <Snackbar error={error} />
   </>
)

NameWithError.defaultProps = {
   ...NameWithLoading.defaultProps,
}