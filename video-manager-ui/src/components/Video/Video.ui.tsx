import React, { useState, SyntheticEvent } from 'react'
import Grid from '@mui/material/Grid'
import CardMedia from '@mui/material/CardMedia'

import { Name } from '../Name'
import { getVideo, isVideoPlaying } from '../../utils/video'

export interface VideoProps {
  /**
   * Video data source
   */
  source: string
  /**
   * Video content
   */
  name: string
  /**
   * Whether the video has been selected
   */
  selected?: boolean
}

/**
 * UI component for identifying a directory
 */
export const Video = ({ name, source, selected }: VideoProps) => {

  const [fullScreen, toggleSize] = useState(false)

  const id = `${name}-video-${Math.random()}`

  const onClick = (e: SyntheticEvent) => {
    e.preventDefault()
    toggleSize(!fullScreen)

    const video = getVideo(id)

    fullScreen && isVideoPlaying(video) ?
      video.pause() :
      video.play()
  }

  return (
    <Grid container
      direction='column'
      alignItems='center'
      width='max-content'
    >
      <Grid item sx={{
        padding: 1.5,
        paddingLeft: 2.5,
        paddingRight: 2.5,
        position: 'relative',
        height: 50,
        width: 80,
        ...fullScreen && {
          position: 'absolute',
          height: '100%',
          width: '100%',
          top: 0,
          left: 0,
          padding: 0,
          paddingLeft: 0,
          paddingRight: 0,
          zIndex: 10000
        }
      }}>
        <CardMedia
          id={id}
          component='video'
          controls={fullScreen}
          src={source}
          onClick={onClick}
          sx={{
            borderRadius: 0.5,
            backgroundColor: 'black',
            height: '100%',
            width: '100%'
          }}
        />
      </Grid>
      {
        !fullScreen &&
        <Grid item>
          <Name
            name={name}
            editable={!selected}
          />
        </Grid>
      }
    </Grid >
  )
}

Video.defaultProps = {
  name: 'New Video',
  selected: false
}