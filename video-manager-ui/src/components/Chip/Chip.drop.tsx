import React from 'react'
import { useDrop } from 'react-dnd'
import Box from '@mui/material/Box'

import { Chip, ChipProps } from './Chip.ui'

export interface WithDropProps {
  /**
   * Action called on drop
   */
  action?: (...args: any[]) => void
}

/**
 * Component Wrapper for dropping on a chip
 */
export const ChipWithDrop = ({ action, ...props }: ChipProps & WithDropProps) => {

  const [{ isDragging, isOver }, drop] = useDrop(() => ({
    accept: 'Folder',
    drop: item => action && action(item),
    collect: monitor => ({
      isDragging: monitor.getItemType() === 'Folder',
      isOver: !!monitor.isOver()
    })
  }))

  return (
    <Box ref={drop}>
      <Chip
        {...props}
        color={isOver ? 'warning' : 'default'}
        disabled={!isDragging}
        sx={{
          ...props.sx,
          transition: 'opacity 0.2s ease-in-out'
        }}
      />
    </Box >
  )
}

ChipWithDrop.defaultProps = {
  ...Chip.defaultProps
}