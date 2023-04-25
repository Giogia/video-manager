import React from 'react'
import Skeleton from '@mui/material/Skeleton'

import { Breadcrumbs, BreadcrumbsProps } from './Breadcrumbs.ui'

interface WithLoadingProps {
  /**
   * Whether the breadcrumbs are loading
   */
  loading: boolean
}

/**
 * Component Wrapper for loading stage
 */
export const BreadcrumbsWithLoading = ({ loading, ...props }: BreadcrumbsProps & WithLoadingProps) => (
   loading ?
      <Skeleton animation='wave' width='40%'>
         <Breadcrumbs {...props} />
      </Skeleton> :
      <Breadcrumbs {...props} />
)

BreadcrumbsWithLoading.defaultProps = {
   loading: false
}