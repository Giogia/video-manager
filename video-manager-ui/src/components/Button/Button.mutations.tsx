import React from 'react'
import { useMutation } from 'react-relay'
import { graphql } from 'babel-plugin-relay/macro'

import { ButtonAddFolderMutation } from './__generated__/ButtonAddFolderMutation.graphql'

import { Button, ButtonProps } from './Button.ui'

/**
 * Add folder logic
 */
const addFolder = (
  graphql`
    mutation ButtonAddFolderMutation($path: String!, $name: String!) {
      addDirectory(input: {path: $path, name: $name}){
        acknowledged
      }
    }
  `
)

/**
 * Component Wrapper for creating new folders
 */
export const AddFolderButton = ({ disabled }: Partial<ButtonProps>) => {
  const [commitMutation, isMutationInFlight] = useMutation<ButtonAddFolderMutation>(addFolder)

  return <Button
    icon='add-folder'
    disabled={disabled || isMutationInFlight}
    action={() => commitMutation({
      variables: {
        path: window.location.pathname,
        name: 'New Folder',
      }
    })}
  />
}
