import React, { useState } from 'react'
import { GraphQLError } from 'graphql'
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

   const [error, setError] = useState(new GraphQLError(''))

   const [commitMutation] = useMutation<LinkMoveFolderMutation>(moveFolder)

   return <LinkWithDrop
      {...props}
      error={error}
      action={({ name }, newPath) => {

         const path = window.location.pathname

         path !== newPath && commitMutation({
            variables: {
               path,
               name,
               newPath
            },
            onError: e => setError(e as GraphQLError)
         })
      }}
   />
}
