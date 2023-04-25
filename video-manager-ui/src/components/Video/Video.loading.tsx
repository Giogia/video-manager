import React from 'react'
import Skeleton from '@mui/material/Skeleton'

import { Video, VideoProps } from './Video.ui'

export interface WithLoadingProps {
   /**
    * Whether the video is loading
    */
   loading: boolean
}

/**
 * Component Wrapper for loading stage
 */
export const VideoWithLoading = ({ loading, ...props }: VideoProps & WithLoadingProps) => (
   loading ?
      <Skeleton animation='pulse'>
         <Video {...props} />
      </Skeleton> :
      <Video {...props} />
)

VideoWithLoading.defaultProps = {
   ...Video.defaultProps,
   loading: false
}