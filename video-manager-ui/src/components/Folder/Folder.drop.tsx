import React from 'react'
import Box from '@mui/material/Box'
import { useDrop } from 'react-dnd'

import { Folder, FolderProps } from './Folder.ui'
import { DRAGGABLES } from '../../utils/drag'

export interface WithDropProps {
  /**
   * Action called on drop
   */
  action?: (...args: any[]) => void
}

/**
 * Component Wrapper for dropping on a folder
 */
export const FolderWithDrop = ({ action, ...props }: FolderProps & WithDropProps) => {

   const { name } = props

   const [{ isOver }, drop] = useDrop(() => ({
      accept: DRAGGABLES,
      drop: item => { action && action(item, name) },
      collect: monitor => ({ isOver: !!monitor.isOver() })
   }))

   return (
      <Box ref={drop}>
         <Folder
            {...props}
            selected={isOver}
         />
      </Box >
   )
}

FolderWithDrop.defaultProps = {
   ...Folder.defaultProps
}