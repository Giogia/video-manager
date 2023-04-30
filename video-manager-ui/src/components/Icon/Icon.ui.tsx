import React from 'react'

import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder'
import UploadFileIcon from '@mui/icons-material/VideoCameraBack'
import DeleteIcon from '@mui/icons-material/Delete'
import FolderIcon from '@mui/icons-material/Folder'
import MovieIcon from '@mui/icons-material/Movie'
import HomeIcon from '@mui/icons-material/Home'
import CloseIcon from '@mui/icons-material/Cancel'
import SearchIcon from '@mui/icons-material/Search'
import FolderOffIcon from '@mui/icons-material/FolderOff'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'

import { SvgIconComponent } from '@mui/icons-material'
import { SxProps, Theme } from '@mui/material'

export const icons = {
   'folder': FolderIcon,
   'video': MovieIcon,
   'add-folder': CreateNewFolderIcon,
   'upload-video': UploadFileIcon,
   'delete': DeleteIcon,
   'home': HomeIcon,
   'close': CloseIcon,
   'search': SearchIcon,
   'no-results': FolderOffIcon,
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
   /**
    * Customize icon themed style
    */
   sx?: SxProps<Theme>,
}

/**
 * Primary UI component for rendering shapes, drawings and logos
 */
export const Icon = ({ id, size, sx }: IconProps) => {

   const Icon = icons[id] as SvgIconComponent

   return (
      <Icon
         id={id}
         data-testid={`${id}-icon`}
         fontSize={size}
         sx={sx}
      />
   )
}