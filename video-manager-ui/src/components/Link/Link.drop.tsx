import React from 'react'
import Box from '@mui/material/Box'
import { useDrop } from 'react-dnd'

import { Link } from '.'
import { LinkProps } from './Link.ui'
import { WithErrorProps } from './Link.error'
import { DRAGGABLES } from '../../utils/drag'

export interface WithDropProps {
  /**
   * Action called on drop
   */
  action?: (...args: any[]) => void
}

/**
 * Component Wrapper for dropping on a link
 */
export const LinkWithDrop = ({ action, ...props }: LinkProps & WithErrorProps & WithDropProps) => {

  const { href, selected } = props

  const [{ isOver }, drop] = useDrop(() => ({
    accept: DRAGGABLES,
    drop: item => { action && action(item, href) },
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