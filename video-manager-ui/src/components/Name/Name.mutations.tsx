import React, { useState } from 'react'
import { GraphQLError } from 'graphql'
import { useMutation } from 'react-relay'
import { GraphQLTaggedNode, MutationParameters } from 'relay-runtime'
import { graphql } from 'babel-plugin-relay/macro'

import { NameRenameFolderMutation } from './__generated__/NameRenameFolderMutation.graphql'
import { NameRenameVideoMutation } from './__generated__/NameRenameVideoMutation.graphql'

import { Name } from '.'
import { NameProps } from './Name.ui'
import { WithLoadingProps } from './Name.loading'

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

   const [error, setError] = useState(new GraphQLError(''))

   const [commitMutation, isMutationInFlight] = useMutation<T>(mutation)

   return <Name
      {...props}
      error={error}
      editable={editable && !isMutationInFlight}
      onChange={(newName: string, oldName: string) => {

         const path = window.location.pathname

         newName !== oldName && commitMutation({
            variables: {
               path,
               oldName,
               newName,
            },
            onError: e => setError(e as GraphQLError)
         })
      }}
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
 * Component Wrapper for renaming videos
 */
export const RenameVideo = ({ ...props }: NameProps & WithLoadingProps) => (
   <Rename<NameRenameVideoMutation>
      {...props}
      mutation={renameVideo}
   />
)