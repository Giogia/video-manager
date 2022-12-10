import React from 'react'
import Skeleton from '@mui/material/Skeleton'

import { Button, ButtonProps } from './Button.ui'

/**
 * Component Wrapper for loading stage
 */
export const ButtonWithLoading = ({ loading, ...props }: { loading: boolean } & ButtonProps) => (
  loading ?
    <Skeleton variant='rounded'>
      <Button {...props} />
    </Skeleton> :
    <Button {...props} />
)

ButtonWithLoading.defaultProps = {
  ...Button.defaultProps,
  loading: false
}