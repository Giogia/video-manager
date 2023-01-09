import React from 'react'
import Box from '@mui/material/Box'
import { useDrop } from 'react-dnd'

import { Link, LinkProps } from './Link.ui'

export interface WithDropProps {
  /**
   * Action called on drop
   */
  action?: (...args: any[]) => void
}

/**
 * Component Wrapper for dropping on a link
 */
export const LinkWithDrop = ({ action, ...props }: LinkProps & WithDropProps) => {

  const { href, selected } = props

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'Folder',
    drop: item => action && action(item, href),
    collect: monitor => ({ isOver: !!monitor.isOver() })
  }))

  return (
    <Box ref={drop}>
      <Link
        {...props}
        selected={selected || isOver}
      />
    </Box >
  )
}

LinkWithDrop.defaultProps = {
  ...Link.defaultProps
}