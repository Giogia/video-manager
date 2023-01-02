import React from 'react'
import { useMutation } from 'react-relay'
import { graphql } from 'babel-plugin-relay/macro'

import { NameRenameFolderMutation } from './__generated__/NameRenameFolderMutation.graphql'

import { Name, NameProps } from './Name.ui'

/**
 * Rename folder logic
 */
const renameFolder = (
  graphql`
    mutation NameRenameFolderMutation($path: String!, $oldName: String!, $newName: String!) {
      renameDirectory(input: {path: $path, name: $oldName}, name: $newName){
        ...Explorer_directory
      }
    }
  `
)

/**
 * Component Wrapper for renaming folders
 */
export const Rename = ({ editable, ...props }: NameProps) => {
  const [commitMutation, isMutationInFlight] = useMutation<NameRenameFolderMutation>(renameFolder)

  return <Name
    {...props}
    editable={editable && !isMutationInFlight}
    onChange={(newName: string, oldName: string) =>
      newName !== oldName && commitMutation({
        variables: {
          path: window.location.pathname,
          oldName,
          newName,
        }
      })
    }
  />
}
