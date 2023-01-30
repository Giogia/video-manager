import React, { useState, Fragment, useMemo } from 'react'
import Button from '@mui/material/Button'
import CardMedia from '@mui/material/CardMedia'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

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
   * Video dimension
   */
  size?: string
  /**
   * Whether the video has been selected
   */
  selected?: boolean
}

/**
 * UI component for identifying a directory
 */
export const Video = ({ name, source, size, selected }: VideoProps) => {

  const [fullscreen, toggleSize] = useState(false)

  const id = useMemo(() => `${name}-video-${Math.random()}`, [name])

  const Wrapper = fullscreen ? Fragment : Button

  const onClick = (e: any) => {
    e.preventDefault()
    toggleSize(!fullscreen)

    const video = getVideo(id)

    // fullscreen && isVideoPlaying(video) ?
    //   video.pause() :
    //   video.play()
  }

  return (
    <Grid container
      direction='column'
      alignItems='center'
      width='max-content'
    >
      <Grid item sx={{
        position: 'relative',
        height: 50,
        width: 70,
        ...fullscreen && {
          position: 'absolute',
          height: '100%',
          width: '100%',
          top: 0,
          left: 0,
          zIndex: 10000,
        }
      }}>
        <Wrapper disabled={selected}>
          <CardMedia
            id={id}
            component='video'
            controls={fullscreen}
            src={source}
            onClick={onClick}
            sx={{
              borderRadius: 0.5,
              height: '100%',
              width: '100%',
              backgroundColor: fullscreen ?
                'black' :
                'background.default',
            }}
          />
        </Wrapper>
      </Grid>
      <Grid item sx={{
        ...fullscreen && {
          position: 'absolute',
          top: 4,
          left: 4,
          zIndex: 10001,
          color: 'white'
        }
      }}>
        <Name
          name={name}
          editable={!selected && !fullscreen}
        />
      </Grid>
      {!fullscreen &&
        <Grid item>
          <Typography
            variant='caption'
            sx={{ fontSize: 9, opacity: 0.75 }}
          >
            {size}
          </Typography>
        </Grid>
      }
    </Grid >
  )
}

Video.defaultProps = {
  name: 'New Video',
  size: '-',
  selected: false
}