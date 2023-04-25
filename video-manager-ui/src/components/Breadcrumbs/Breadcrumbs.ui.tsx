import React from 'react'
import BreadcrumbsMui from '@mui/material/Breadcrumbs'
import { sep } from 'path'
import { MoveFolderLink } from '../Link'

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

   const levels = path.split(sep)
   const href = (level: number) => levels.slice(0, level + 1).join(sep) || sep

   return (
      <BreadcrumbsMui
         aria-label='breadcrumb'
         itemsBeforeCollapse={2}
         itemsAfterCollapse={2}
      >
         {levels
            .map((link, i) => (
               <MoveFolderLink
                  name={decodeURI(link)}
                  key={i}
                  href={href(i)}
                  isRoot={!link && i === 0}
                  selected={i === levels.length - 1}
               />
            ))}
      </BreadcrumbsMui>
   )
}