import React from 'react'

import { ChipProps } from './Chip.ui'
import { ChipWithLoading } from './Chip.loading'
import { Snackbar } from '../Snackbar'

export interface WithErrorProps {
  /**
   * The error related to the chip action
   */
  error?: any
}

/**
 * Component Wrapper for error stage
 */
export const ChipWithError = ({ error, ...props }: ChipProps & WithErrorProps) => (
  <>
    <ChipWithLoading {...props} />
    <Snackbar error={error} />
  </>
)

ChipWithError.defaultProps = {
  ...ChipWithLoading.defaultProps,
}