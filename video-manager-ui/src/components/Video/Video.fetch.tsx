import React from 'react'
import env from 'react-dotenv'
import { graphql } from 'babel-plugin-relay/macro'
import { useFragment } from 'react-relay'

import { VideoFragment$key } from './__generated__/VideoFragment.graphql'

import { VideoWithDrag } from './Video.drag'

export interface WithFetchProps {
  /**
   * name fragment reference
   */
  fragmentRef: VideoFragment$key
}

/**
 * Data fetching logic
 */
const fragment = (
   graphql`
    fragment VideoFragment on Video{
      id,
      name,
      url,
      size
    }
  `
)

/**
 * Component wrapper fetching data
 */
export const VideoWithFetch = ({ fragmentRef }: WithFetchProps) => {
   const { name, url, size } = useFragment<VideoFragment$key>(fragment, fragmentRef)

   return (
      <VideoWithDrag
         name={name}
         source={env.BASE_URL + url}
         size={size}
      />
   )
}

VideoWithFetch.defaultProps = {
   ...VideoWithDrag.defaultProps
}