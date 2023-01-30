import React from 'react'
import { graphql } from 'babel-plugin-relay/macro'
import { useFragment } from 'react-relay'

import { Video$key } from './__generated__/Video.graphql'

import { VideoProps } from './Video.ui'
import { VideoWithDrag } from './Video.drag'

export interface WithFetchProps {
  /**
   * name fragment reference
   */
  fragmentRef?: Video$key
}

/**
 * Data fetching logic
 */
const fragment = (
  graphql`
    fragment Video on Directory{
      name  
    }
  `
)

/**
 * Component wrapper fetching data
 */
export const VideoWithFetch = ({ fragmentRef, ...props }: VideoProps & WithFetchProps) => {
  const { name } = useFragment<Video$key>(fragment, fragmentRef!)

  return (
    <VideoWithDrag
      {...props}
      name={name!}
    />
  )
}

VideoWithFetch.defaultProps = {
  ...VideoWithDrag.defaultProps
}