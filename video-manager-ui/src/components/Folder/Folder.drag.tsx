import React from 'react'
import Box from '@mui/material/Box'
import { useDrag } from 'react-dnd'

import { Folder, FolderProps } from './Folder.ui'
import { MoveFolderFolder } from './Folder.mutations'

/**
 * Component Wrapper for dragging a folder
 */
export const FolderWithDrag = ({ ...props }: FolderProps) => {

  const { name } = props

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'Folder',
    item: { name },
    collect: monitor => ({ isDragging: !!monitor.isDragging() })
  }), [name])

  return (
    <Box ref={drag}
      style={{
        opacity: isDragging ? 0 : 1,
        transform: 'translate(0, 0)',
        transition: 'opacity 0.2s ease-in-out'
      }}>
      <MoveFolderFolder {...props} />
    </Box>
  )
}

FolderWithDrag.defaultProps = {
  ...Folder.defaultProps
}