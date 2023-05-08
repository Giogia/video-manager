import React, { useState, Fragment } from 'react'
import MuiButton from '@mui/material/Button'
import CardMedia from '@mui/material/CardMedia'
import Grid from '@mui/material/Grid'

import { Button } from '../Button'
import { RenameVideo } from '../Name'
import { Caption } from '../Caption'
import { formatSize } from '../../utils/size'

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
    * Whether the video is loading
    */
   loading: boolean
   /**
    * Video dimension
    */
   size?: number
}

/**
 * UI component for identifying a directory
 */
export const Video = ({ name, source, size, loading }: VideoProps) => {

   const [fullscreen, setFullscreen] = useState(false)

   const Wrapper = fullscreen ? Fragment : MuiButton

   return (
      <Grid container
         direction='column'
         alignItems='center'
         width='max-content'
         id='video'
      >
         <Grid item sx={{
            ...fullscreen && {
               position: 'absolute',
               height: '100%',
               width: '100%',
               top: 0,
               left: 0,
               zIndex: 10000,
            }
         }}>
            <Wrapper {...!fullscreen && { sx: { height: 50, width: 70 } }}>
               <CardMedia
                  component='video'
                  controls={fullscreen}
                  src={source}
                  role='video'
                  onClick={() =>
                     setTimeout(() =>
                        setFullscreen(true), 250)
                  }
                  sx={{
                     borderRadius: 0.5,
                     backgroundColor: 'black',
                     height: '100%',
                     width: '100%',
                  }}
               />
            </Wrapper>
         </Grid>
         <Grid item>
            <RenameVideo
               name={name}
               editable={!fullscreen}
               loading={loading}
               sx={{
                  ...fullscreen && {
                     position: 'absolute',
                     top: 2,
                     left: 0,
                     right: 0,
                     padding: 1,
                     zIndex: 10001,
                     opacity: 0.8,
                     color: 'white',
                     fontSize: 14
                  }
               }}
            />
         </Grid>
         {
            fullscreen ?
               <Button
                  icon='close'
                  action={() => setFullscreen(false)}
                  tooltip={false}
                  sx={{
                     position: 'absolute',
                     top: 2,
                     right: 4,
                     zIndex: 10001,
                     color: 'white'
                  }}
               /> :
               <Grid item>
                  <Caption
                     text={formatSize(size)}
                     loading={loading}
                  />
               </Grid>
         }
      </Grid >
   )
}

Video.defaultProps = {
   name: 'New Video',
   loading: false,
}