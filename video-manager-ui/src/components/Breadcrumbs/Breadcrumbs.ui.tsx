import React from 'react'
import BreadcrumbsMui from '@mui/material/Breadcrumbs'

import { Link } from '../Link'

const SEPARATOR = '/'

export interface BreadcrumbsProps {
  /**
   * Current Directory
   */
  path: string
}

/**
 * UI component for directories navigation
 */
export const Breadcrumbs = ({ path }: BreadcrumbsProps) => {

  const levels = path.split(SEPARATOR)
  const href = (level: number) => levels.slice(0, level + 1).join(SEPARATOR) || SEPARATOR

  return (
    <BreadcrumbsMui
      aria-label='breadcrumb'
      itemsBeforeCollapse={2}
      itemsAfterCollapse={2}
    >
      {levels
        .map((link, i) => (
          <Link
            name={link}
            href={href(i)}
            isRoot={!link && i === 0}
            key={i}
          />
        ))}
    </BreadcrumbsMui>
  )
}