import React from 'react'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import BreadcrumbsMui from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'

import { Button } from '../Button'

const SEPARATOR = '/'

export interface BreadcrumbsProps {
  /**
   * Current Directory
   */
  path: string
}

/**
 * UI component to navigate parent directories
 */
export const Breadcrumbs = ({ path }: BreadcrumbsProps) => {

  const levels = path.split(SEPARATOR)
  const href = (level: number) => levels.slice(0, level + 1).join(SEPARATOR) || SEPARATOR

  const navigate = useNavigate()

  return (
    <BreadcrumbsMui
      aria-label='breadcrumb'
      itemsBeforeCollapse={2}
      itemsAfterCollapse={2}
    >
      {levels
        .map((link, i) => (
          <Link
            underline='hover'
            key={i}
            onClick={() => navigate(href(i))}
          >
            {!link && i === 0 ?
              <Button
                icon='home'
                size='small'
              /> :
              <Box sx={{ padding: '8px' }}>
                {link}
              </Box>
            }
          </Link>
        ))}
    </BreadcrumbsMui>
  )
}

Breadcrumbs.defaultProps = {
  onClick: () => { }
}