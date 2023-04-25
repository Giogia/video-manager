import React from 'react'
import Skeleton from '@mui/material/Skeleton'

import { Caption, CaptionProps } from './Caption.ui'

export interface WithLoadingProps {
   /**
    * Whether the caption is loading
    */
   loading: boolean
}

/**
 * Component Wrapper for loading stage
 */
export const CaptionWithLoading = ({ loading, ...props }: CaptionProps & WithLoadingProps) => (
   loading ?
      <Skeleton animation='pulse'>
         <Caption text='loading' />
      </Skeleton> :
      <Caption {...props} />
)

CaptionWithLoading.defaultProps = {
   ...Caption.defaultProps,
   loading: false
}