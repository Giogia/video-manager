import React, { MouseEvent } from 'react'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder'
import UploadFileIcon from '@mui/icons-material/UploadFile'
import DeleteIcon from '@mui/icons-material/Delete';
import FolderIcon from '@mui/icons-material/Folder'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'

const icons = {
  'folder': FolderIcon,
  'add-folder': CreateNewFolderIcon,
  'upload-video': UploadFileIcon,
  'delete': DeleteIcon,
  'light-theme': LightModeIcon,
  'dark-theme': DarkModeIcon,
}

export interface ButtonProps {
  /**
   * Button functionality
   */
  action?: (e: MouseEvent) => void
  /**
   * Whether the button is active
   */
  disabled?: boolean
  /**
   * Button icon
   */
  icon: keyof typeof icons
  /**
   * Button dimension
   */
  size?: 'small' | 'medium' | 'large'
  /**
   * Whether to show a button description on hover
   */
  tooltip: boolean
}

/**
 * Primary UI component for user interaction
 */
export const Button = ({ action, size, icon, disabled, tooltip }: ButtonProps) => {
  const Icon = icons[icon]
  const title = icon.replace('-', ' ')

  return (
    <Tooltip title={tooltip && title}>
      <span>
        <IconButton
          disabled={disabled}
          onClick={action}
        >
          <Icon
            fontSize={size}
          />
        </IconButton>
      </span>
    </Tooltip>
  )
}

Button.defaultProps = {
  disabled: false,
  size: 'medium',
  tooltip: true
}