import React, { useState } from 'react'
import { GraphQLError } from 'graphql'
import { useMutation } from 'react-relay'
import { graphql } from 'babel-plugin-relay/macro'

import { FolderMoveFolderMutation } from './__generated__/FolderMoveFolderMutation.graphql'

import { FolderWithDrop } from './Folder.drop'
import { FolderProps } from './Folder.ui'
import { combinePath } from '../../utils/path'

/**
 * Move folder logic
 */
const moveFolder = (
   graphql`
    mutation FolderMoveFolderMutation($path: String!, $name: String!, $newPath: String!) {
      moveDirectory(input: {path: $path, name: $name}, path: $newPath){
        ...Explorer_directory
      }
    }
  `
)

/**
 * Component Wrapper for creating new folders
 */
export const MoveFolderFolder = ({ ...props }: FolderProps) => {
  
   const [error, setError] = useState(new GraphQLError(''))

   const [commitMutation] = useMutation<FolderMoveFolderMutation>(moveFolder)

   const path = window.location.pathname

   return <FolderWithDrop
      {...props}
      error={error}
      action={({ name }, targetName) =>
         name !== targetName && commitMutation({
            variables: {
               path,
               name,
               newPath: combinePath(path, targetName)
            },
            onError: e => setError(e as GraphQLError)
         })
      }
   />
}