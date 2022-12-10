import React from 'react'
import Skeleton from '@mui/material/Skeleton'

import { Name,  NameProps } from './Name.ui'
import { Rename } from './Name.mutations'

interface WithLoadingProps {
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
      <Rename {...props} />
    </Skeleton> :
    <Rename {...props} />
)

NameWithLoading.defaultProps = {
  ...Name.defaultProps,
  loading: false
}