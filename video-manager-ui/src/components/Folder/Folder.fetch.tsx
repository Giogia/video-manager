import React from 'react'
import { graphql } from 'babel-plugin-relay/macro'
import { useFragment } from 'react-relay'

import { Folder_name$key } from './__generated__/Folder_name.graphql'

import { FolderProps } from './Folder.ui'
import { FolderWithDrag } from './Folder.drag'

export interface WithFetchProps {
  /**
   * name fragment reference
   */
  fragmentRef?: Folder_name$key
}

/**
 * Data fetching logic
 */
const fragment = (
  graphql`
    fragment Folder_name on Directory{
      name  
    }
  `
)

/**
 * Component wrapper fetching data
 */
export const FolderWithFetch = ({ fragmentRef, ...props }: FolderProps & WithFetchProps) => {
  const { name } = useFragment<Folder_name$key>(fragment, fragmentRef!)

  return (
    <FolderWithDrag
      {...props}
      name={name}
    />
  )
}

FolderWithFetch.defaultProps = {
  ...FolderWithDrag.defaultProps
}