import React from 'react'
import Skeleton from '@mui/material/Skeleton'

import { Name,  NameProps } from './Name.ui'

export interface WithLoadingProps {
  /**
   * Whether the name is loading
   */
  loading: boolean
}

/**
 * Component Wrapper for loading stage
 */
export const NameWithLoading = ({ loading, ...props }: NameProps & WithLoadingProps) => (
  loading ?
    <Skeleton animation='wave'>
      <Name {...props} />
    </Skeleton> :
    <Name {...props} />
)

NameWithLoading.defaultProps = {
  ...Name.defaultProps,
  loading: false
}