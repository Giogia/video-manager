import React from 'react'

import { ChipProps } from './Chip.ui'
import { ChipWithLoading } from './Chip.loading'
import { Snackbar } from '../Snackbar'
import { Error } from '../../utils/error'

export interface WithErrorProps {
  /**
   * The error related to the chip action
   */
  error?: Error
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