import React from 'react'
import { graphql } from 'babel-plugin-relay/macro'
import { useFragment } from 'react-relay'

import { Folder$key } from './__generated__/Folder.graphql'

import { FolderProps } from './Folder.ui'
import { FolderWithRouter } from './Folder.router'

export interface WithFetchProps {
  /**
   * name fragment reference
   */
  fragmentRef?: Folder$key
}

/**
 * Data fetching logic
 */
const fragment = (
  graphql`
    fragment Folder on Directory{
      name  
      path
    }
  `
)

/**
 * Component wrapper fetching data
 */
export const FolderWithFetch = ({ fragmentRef, ...props }: FolderProps & WithFetchProps) => {
  const { name, path } = useFragment<Folder$key>(fragment, fragmentRef!)

  return (
    <FolderWithRouter
      {...props}
      name={name!}
      path={path}
    />
  )
}

FolderWithFetch.defaultProps = {
  ...FolderWithRouter.defaultProps
}