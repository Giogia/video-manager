import React from 'react'
import Box from '@mui/material/Box'
import { useDrop } from 'react-dnd'

import { Chip, ChipProps } from './Chip.ui'
import { DRAGGABLES } from '../../utils/drag'

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
    accept: DRAGGABLES,
    drop: item => { action && action(item) },
    collect: monitor => ({
      isDragging: DRAGGABLES.includes(monitor.getItemType() as string),
      isOver: !!monitor.isOver()
    })
  }))

  return (
    <Box ref={drop}>
      <Chip
        {...props}
        disabled={!isDragging}
        sx={{
          ...props.sx,
          padding: 2.1,
          paddingLeft: isOver ? 3 : 1,
          paddingRight: isOver ? 3 : 1,
          backgroundColor: isDragging ? 'background.default' : 'transparent',
          color: isOver ? 'error.light' : 'default',
          transitionProperty: 'padding, background-color, opacity',
          transitionDuration: '0.15s',
          transitionTimingFunction: 'ease-in-out'
        }}
      />
    </Box >
  )
}

ChipWithDrop.defaultProps = {
  ...Chip.defaultProps
}