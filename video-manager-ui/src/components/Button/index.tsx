import React, { MouseEvent } from 'react'
import IconButton from '@mui/material/IconButton'
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder'
import UploadFileIcon from '@mui/icons-material/UploadFile'
import FolderIcon from '@mui/icons-material/Folder'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'

const buttons = {
  'add-folder': CreateNewFolderIcon,
  'add-video': UploadFileIcon,
  'folder': FolderIcon,
  'light': LightModeIcon,
  'dark': DarkModeIcon,
}

interface ButtonProps {
  /**
   * Button functionality
   */
  action?: (e: MouseEvent) => void
  /**
   * Button icon
   */
  type: keyof typeof buttons
  /**
   * Button dimensions
   */
  size?: 'small' | 'medium' | 'large'
}

/**
 * Primary UI component for user interaction
 */
export const Button = ({ action, size, type }: ButtonProps) => {
  const Icon = buttons[type]

  return (
    <IconButton onClick={action}>
      <Icon fontSize={size} />
    </IconButton>
  )
}

Button.defaultProps = {
  size: 'medium'
}