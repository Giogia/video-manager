import React from 'react'
import { useMutation } from 'react-relay'
import { GraphQLTaggedNode, MutationParameters } from 'relay-runtime'
import { graphql } from 'babel-plugin-relay/macro'

import { NameRenameFolderMutation } from './__generated__/NameRenameFolderMutation.graphql'
import { NameRenameVideoMutation } from './__generated__/NameRenameVideoMutation.graphql'

import { NameProps } from './Name.ui'
import { NameWithLoading, WithLoadingProps } from './Name.loading'

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
 * Rename folder logic
 */
const renameVideo = (
  graphql`
    mutation NameRenameVideoMutation($path: String!, $oldName: String!, $newName: String!) {
      renameVideo(input: {path: $path, name: $oldName}, name: $newName){
        ...Explorer_directory
      }
    }
  `
)


/**
 * Component Wrapper for renaming nodes
 */
export const Rename = <T extends MutationParameters,>({ editable, mutation, ...props }: NameProps & WithLoadingProps & { mutation: GraphQLTaggedNode }) => {
  const [commitMutation, isMutationInFlight] = useMutation<T>(mutation)

  return <NameWithLoading
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


/**
 * Component Wrapper for renaming folders
 */
export const RenameFolder = ({ ...props }: NameProps & WithLoadingProps) => (
  <Rename<NameRenameFolderMutation>
    {...props}
    mutation={renameFolder}
  />
)

/**
 * Component Wrapper for renaming videos (renames also saved file)
 */
export const RenameVideo = ({ ...props }: NameProps & WithLoadingProps) => (
  <Rename<NameRenameVideoMutation>
    {...props}
    mutation={renameVideo}
  />
)