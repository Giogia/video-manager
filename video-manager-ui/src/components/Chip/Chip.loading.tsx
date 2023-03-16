import React from 'react'
import Skeleton from '@mui/material/Skeleton'

import { Chip, ChipProps } from './Chip.ui'

interface WithLoadingProps {
  /**
   * Whether the chip is loading
   */
  loading: boolean
}

/**
 * Component Wrapper for loading stage
 */
export const ChipWithLoading = ({ loading, ...props }: ChipProps & WithLoadingProps) => (
  loading ?
    <Skeleton variant='rounded'>
      <Chip {...props} />
    </Skeleton> :
    <Chip {...props} />
)

ChipWithLoading.defaultProps = {
  ...Chip.defaultProps,
  loading: false
}