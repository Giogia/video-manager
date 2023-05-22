import React, { useState } from 'react'
import { GraphQLError } from 'graphql'
import { useMutation } from 'react-relay'
import { graphql } from 'babel-plugin-relay/macro'

import { ButtonAddFolderMutation } from './__generated__/ButtonAddFolderMutation.graphql'
import { ButtonUploadVideoMutation } from './__generated__/ButtonUploadVideoMutation.graphql'

import { Button } from '.'
import { ButtonProps } from './Button.ui'
import { UploadButton } from './Button.upload'

const NEW_FOLDER = 'New Folder'

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

/**
 * Upload video logic
 */
const uploadVideo = (
   graphql`
    mutation ButtonUploadVideoMutation($path: String!, $video: Upload!) {
      uploadVideo(input: {path: $path, video: $video}){
        ...Explorer_directory
      }
    }
  `
)

/**
 * Component Wrapper for creating new folders
 */
export const AddFolderButton = ({ ...props }: Partial<ButtonProps>) => {

   const [error, setError] = useState(new GraphQLError(''))

   const [commitMutation, isMutationInFlight] = useMutation<ButtonAddFolderMutation>(addFolder)

   return <Button {...props}
      icon='add-folder'
      error={error}
      loading={isMutationInFlight}
      action={() => commitMutation({
         variables: {
            path: window.location.pathname,
            name: NEW_FOLDER
         },
         onError: e => setError(e as GraphQLError)
      })}
   />
}

/**
 * Component Wrapper for uploading new videos
 */
export const UploadVideoButton = ({ ...props }: Partial<ButtonProps>) => {

   const [error, setError] = useState(new GraphQLError(''))

   const [commitMutation, isMutationInFlight] = useMutation<ButtonUploadVideoMutation>(uploadVideo)

   return (
      <UploadButton {...props}
         error={error}
         icon='upload-video'
         loading={isMutationInFlight}
         action={(video) => commitMutation({
            uploadables: { video },
            variables: {
               path: window.location.pathname,
               video: null
            },
            onError: e => setError(e as GraphQLError)
         })}
      />
   )
}
