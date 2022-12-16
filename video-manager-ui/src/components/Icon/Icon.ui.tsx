import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder'
import UploadFileIcon from '@mui/icons-material/UploadFile'
import DeleteIcon from '@mui/icons-material/Delete';
import FolderIcon from '@mui/icons-material/Folder'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'

export const icons = {
  'folder': FolderIcon,
  'add-folder': CreateNewFolderIcon,
  'upload-video': UploadFileIcon,
  'delete': DeleteIcon,
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

export const Icon = ({ id, size }: IconProps) => {

  const Icon = icons[id]

  return (
    <Icon
      fontSize={size}
    />
  )
}
