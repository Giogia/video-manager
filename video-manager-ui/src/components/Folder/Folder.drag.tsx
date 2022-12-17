import React from 'react'
import { useDrag } from 'react-dnd'

import { Folder, FolderProps } from './Folder.ui'

/**
 * Component Wrapper for dragging a folder
 */
export const FolderWithDrag = ({ ...props }: FolderProps) => {

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'Folder',
    collect: monitor => ({ isDragging: !!monitor.isDragging() })
  }))

  return (
    <div ref={drag}
      style={{
        opacity: isDragging ? 0 : 1,
        transform: 'translate(0, 0)',
        transition: 'opacity 0.2s ease-in-out'
      }}>
      <Folder {...props} />
    </div>
  )
}

FolderWithDrag.defaultProps = {
  ...Folder.defaultProps
}