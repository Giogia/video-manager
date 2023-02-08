import React, { useState, Fragment } from 'react'
import MuiButton from '@mui/material/Button'
import CardMedia from '@mui/material/CardMedia'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

import { Button } from '../Button'
import { Name } from '../Name'

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
}

/**
 * UI component for identifying a directory
 */
export const Video = ({ name, source, size }: VideoProps) => {

  const [fullscreen, setFullscreen] = useState(false)

  const Wrapper = fullscreen ? Fragment : MuiButton

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
        <Wrapper>
          <CardMedia
            component='video'
            controls={fullscreen}
            src={source}
            onClick={() => setFullscreen(true)}
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
      <Grid item>
        <Name
          name={name}
          editable={!fullscreen}
          sx={{
            ...fullscreen && {
              position: 'absolute',
              top: 2,
              left: 8,
              padding: 0.5,
              zIndex: 10001,
              opacity: 1, 
              color: 'white' 
            }
          }}
        />
      </Grid>
      {
        fullscreen &&
        <Button
          icon='close'
          size='small'
          action={() => setFullscreen(false)}
          tooltip={false}
          sx={{
            position: 'absolute',
            top: 2,
            right: 2,
            padding: 0.5,
            zIndex: 10001,
            color: 'white'
          }}
        />
      }
      {
        !fullscreen &&
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
  size: '-'
}