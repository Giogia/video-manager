import React from 'react'
import BreadcrumbsMui from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'

const SEPARATOR = '/'

interface BreadcrumbsProps {
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
  const href = (level: number) => levels.slice(0, level + 1).join(SEPARATOR)

  return (
    <BreadcrumbsMui
      aria-label='breadcrumb'
      itemsBeforeCollapse={2}
      itemsAfterCollapse={2}
      separator='›'
      sx={{ paddingLeft: 2 }}
    >
      {levels
        .map((link, i) => (
          <Link
            underline='hover'
            href={href(i)}
            key={i}
          >
            {link}
          </Link>
        ))}
    </BreadcrumbsMui>
  )
}