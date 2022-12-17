import React from 'react'
import { useDrag } from 'react-dnd'
import Box from '@mui/material/Box'

import { Folder, FolderProps } from './Folder.ui'

/**
 * Component Wrapper for dragging a folder
 */
export const FolderWithDrag = ({ ...props }: FolderProps) => {

  const { name } = props

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'Folder',
    item: { name },
    collect: monitor => ({ isDragging: !!monitor.isDragging() })
  }))

  return (
    <Box ref={drag}
      style={{
        opacity: isDragging ? 0 : 1,
        transform: 'translate(0, 0)',
        transition: 'opacity 0.2s ease-in-out'
      }}>
      <Folder {...props} />
    </Box>
  )
}

FolderWithDrag.defaultProps = {
  ...Folder.defaultProps
}