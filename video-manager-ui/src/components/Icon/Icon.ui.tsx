import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder'
import UploadFileIcon from '@mui/icons-material/VideoCameraBack'
import DeleteIcon from '@mui/icons-material/Delete'
import FolderIcon from '@mui/icons-material/Folder'
import HomeIcon from '@mui/icons-material/Home'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'

import { SvgIconComponent } from '@mui/icons-material'
import { SvgIconProps } from '@mui/material'

export const icons = {
  'folder': FolderIcon,
  'add-folder': CreateNewFolderIcon,
  'upload-video': UploadFileIcon,
  'delete': DeleteIcon,
  'home': HomeIcon,
  'light-theme': LightModeIcon,
  'dark-theme': DarkModeIcon,
}

export interface IconProps {
  /**
   * Icon type
   */
  id: keyof typeof icons
  /**
   * Icon dimension
   */
  size?: 'small' | 'medium' | 'large'
}

/**
 * Primary UI component for rendering shapes, drawings and logos
 */
export const Icon = ({ id, size, ...props }: IconProps & SvgIconProps) => {

  const Icon = icons[id] as SvgIconComponent

  return (
    <Icon
      {...props}
      fontSize={size}
    />
  )
}
