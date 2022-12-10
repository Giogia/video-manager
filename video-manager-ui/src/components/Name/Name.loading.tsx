import React from 'react'
import Skeleton from '@mui/material/Skeleton'

import { Name, NameProps } from './Name.ui'

/**
 * Component Wrapper for loading stage
 */
export const NameWithLoading = ({ loading, ...props }: { loading: boolean } & NameProps) => (
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