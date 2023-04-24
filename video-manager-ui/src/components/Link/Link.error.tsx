import React from 'react'

import { Link, LinkProps } from './Link.ui'
import { Snackbar } from '../Snackbar'

export interface WithErrorProps {
  /**
   * The error related to the link action
   */
  error?: any
}

/**
 * Component Wrapper for error stage
 */
export const LinkWithError = ({ error, ...props }: LinkProps & WithErrorProps) => (
  <>
    <Link {...props} />
    <Snackbar error={error} />
  </>
)

LinkWithError.defaultProps = {
  ...Link.defaultProps,
}