import React from 'react'
import IconButton from '@mui/material/IconButton'
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder'
import UploadFileIcon from '@mui/icons-material/UploadFile'
import FolderIcon from '@mui/icons-material/Folder'

const buttons = {
  'add-folder': <CreateNewFolderIcon />,
  'add-video': <UploadFileIcon />,
  'folder': <FolderIcon fontSize='large'/>
}

interface ButtonProps {
  /**
   * Button function
   */
  type: keyof typeof buttons
}

/**
 * Primary UI component for user interaction
 */
export const Button = ({ type }: ButtonProps) => (
  <IconButton>
    {buttons[type]}
  </IconButton>
)

