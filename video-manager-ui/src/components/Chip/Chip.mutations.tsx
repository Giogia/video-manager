import React from 'react'
import { useMutation } from 'react-relay'
import { graphql } from 'babel-plugin-relay/macro'

import { ChipDeleteFolderMutation } from './__generated__/ChipDeleteFolderMutation.graphql'
import { ChipDeleteVideoMutation } from './__generated__/ChipDeleteVideoMutation.graphql'

import { ChipWithDrop } from './Chip.drop'
import { FOLDER, VIDEO } from '../../utils/drag'

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
 * Delete video logic
 */
const deleteVideo = (
  graphql`
    mutation ChipDeleteVideoMutation($path: String!, $name: String!) {
      removeVideo(input: {path: $path, name: $name}){
        ...Explorer_directory
      }
    }
  `
)

/**
 * Component Wrapper for creating new folders
 */
export const DeleteFolderChip = () => {
  const [commitFolderMutation] = useMutation<ChipDeleteFolderMutation>(deleteFolder)
  const [commitVideoMutation] = useMutation<ChipDeleteVideoMutation>(deleteVideo)

  return <ChipWithDrop
    icon='delete'
    tooltip='Drag here an element to delete'
    action={({ name, type }) => {

      const variables = {
        path: window.location.pathname,
        name
      }

      if (type === FOLDER) commitFolderMutation({ variables })
      if (type === VIDEO) commitVideoMutation({ variables })
    }}
  />
}