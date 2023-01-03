import React from 'react'
import { useMutation } from 'react-relay'
import { graphql } from 'babel-plugin-relay/macro'

import { LinkMoveFolderMutation } from './__generated__/LinkMoveFolderMutation.graphql'

import { LinkWithDrop, WithDropProps } from './Link.drop'
import { LinkProps } from './Link.ui'

/**
 * Move folder logic
 */
const moveFolder = (
  graphql`
    mutation LinkMoveFolderMutation($path: String!, $name: String!, $newPath: String!) {
      moveDirectory(input: {path: $path, name: $name}, path: $newPath){
        ...Explorer_directory
      }
    }
  `
)

/**
 * Component Wrapper for creating new folders
 */
export const MoveFolderLink = ({ ...props }: LinkProps & WithDropProps) => {
  const [commitMutation] = useMutation<LinkMoveFolderMutation>(moveFolder)

  const path = window.location.pathname

  return <LinkWithDrop
    {...props}
    action={({ name }, newPath) =>
      path !== newPath && commitMutation({
        variables: {
          path,
          name,
          newPath
        }
      })
    }
  />
}
