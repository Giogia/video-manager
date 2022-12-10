import React from 'react'
import Skeleton from '@mui/material/Skeleton'

import { Button, ButtonProps } from './Button.ui'

interface WithLoadingProps {
  /**
   * Whether the button is loading
   */
  loading: boolean
}

/**
 * Component Wrapper for loading stage
 */
export const ButtonWithLoading = ({ loading, ...props }: ButtonProps & WithLoadingProps) => (
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