import React from 'react'
import Box from '@mui/material/Box'
import { useDrag } from 'react-dnd'
import { usePreview } from 'react-dnd-preview'

import { Video } from '.'
import { VideoProps } from './Video.ui'
import { VIDEO } from '../../utils/drag'

/**
 * Component Wrapper for dragging a video
 */
export const VideoWithDrag = ({ ...props }: VideoProps) => {

   const { name } = props

   const [{ isDragging }, drag] = useDrag(() => ({
      type: VIDEO,
      item: { name, type: VIDEO },
      collect: monitor => ({ isDragging: !!monitor.isDragging() })
   }))

   const { display: preview } = usePreview()

   return (
      <Box {
         ...preview ? {
            sx: {
               opacity: isDragging ? 0 : 1,
               transform: 'translate(0,0)',
               transition: 'opacity 0.2s ease-in-out'
            }
         } : { ref: drag }
      }>
         <Video {...props} />
      </Box>
   )
}

VideoWithDrag.defaultProps = {
   ...Video.defaultProps
}