import React from 'react'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'

const SEPARATOR = '/'

interface PathProps {
  /**
   * Current Directory
   */
  path: string
}

/**
 * UI component to navigate parent directories
 */
export const Path = ({ path }: PathProps) => {

  const levels = path.split(SEPARATOR)
  const href = (level: number) => levels.slice(0, level + 1).join(SEPARATOR)

  return (
    <Breadcrumbs
      aria-label='breadcrumb'
      itemsAfterCollapse={5}
    >
      {levels
        .map((link, i) => (
          <Link
            underline='hover'
            href={href(i)}
          >
            {link}
          </Link>
        ))}
    </Breadcrumbs>
  )
}