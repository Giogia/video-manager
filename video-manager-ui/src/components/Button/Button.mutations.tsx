import React from 'react'
import { useMutation } from 'react-relay'
import { graphql } from 'babel-plugin-relay/macro'

import { ButtonAddFolderMutation } from './__generated__/ButtonAddFolderMutation.graphql'

import { Button, ButtonProps } from './Button.ui'
// import { combinePath } from '../../utils/path'

const NEW_FOLDER = "New Folder"

/**
 * Add folder logic
 */
const addFolder = (
  graphql`
    mutation ButtonAddFolderMutation($path: String!, $name: String!) {
      addDirectory(input: {path: $path, name: $name}){
        ...Explorer_directory
      }
    }
  `
)
export interface WithResponseProps {
  /**
   * Explorer content after add folder mutation
   */
  optimisticResponse: {
    id?: string
    children: { props: { id: string, name: string, path: string } }[]
  }
}

/**
 * Component Wrapper for creating new folders
 */
export const AddFolderButton = ({ disabled, optimisticResponse }: Partial<ButtonProps> & WithResponseProps) => {

  const [commitMutation, isMutationInFlight] = useMutation<ButtonAddFolderMutation>(addFolder)

  const path = window.location.pathname

  // const { id, children } = optimisticResponse

  return <Button
    icon='add-folder'
    disabled={disabled || isMutationInFlight}
    action={() => commitMutation({
      variables: {
        path,
        name: NEW_FOLDER,
      },
      // optimisticResponse: {
      //   addDirectory: {
      //     id,
      //     children: [
      //       ...children, {
      //         name: NEW_FOLDER,
      //         path: combinePath(path, NEW_FOLDER)
      //       }
      //     ]
      //   }
      // }
    })}
  />
}
