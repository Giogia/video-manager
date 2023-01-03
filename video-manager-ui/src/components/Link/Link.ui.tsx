import React from 'react'
import Box from '@mui/material/Box'
import LinkMui from '@mui/material/Link'
import { useNavigate } from 'react-router-dom'

import { Button } from '../Button'

export interface LinkProps {
  /**
   * Link label
   */
  name: string
  /**
   * Link redirection
   */
  href: string
  /**
   * Whether tho show home icon
   */
  isRoot: boolean
  /**
   * Whether the link has been selected
   */
  selected?: boolean
}

/**
 * Primary UI component for directories navigation
 */
export const Link = ({ name, href, isRoot, selected }: LinkProps) => {

  const navigate = useNavigate()

  return (
    <LinkMui
      underline='hover'
      onClick={() => navigate(href)}
    >
      {isRoot ?
        <Button
          icon='home'
          size='small'
          disabled={selected}
        /> :
        <Box
          padding={0.75}
          sx={{ opacity: selected ? 0.5 : 1 }}
        >
          {name}
        </Box>}
    </LinkMui >
  )
}

Link.defaultProps = {
  isRoot: false,
  selected: false
}