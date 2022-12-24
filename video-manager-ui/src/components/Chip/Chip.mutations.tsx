import React from 'react'
import { useMutation } from 'react-relay'
import { graphql } from 'babel-plugin-relay/macro'

import { ChipDeleteFolderMutation } from './__generated__/ChipDeleteFolderMutation.graphql'

import { ChipWithDrop } from './Chip.drop'

/**
 * Delete folder logic
 */
const deleteFolder = (
  graphql`
    mutation ChipDeleteFolderMutation($path: String!, $name: String!) {
      removeDirectory(input: {path: $path, name: $name}){
        ...Explorer_directory
      }
    }
  `
)

/**
 * Component Wrapper for creating new folders
 */
export const DeleteFolderChip = () => {
  const [commitMutation] = useMutation<ChipDeleteFolderMutation>(deleteFolder)

  return <ChipWithDrop
    icon='delete'
    tooltip='Drag here an element to delete'
    action={({ name }) => commitMutation({
      variables: {
        path: window.location.pathname,
        name
      }
    })}
  />
}