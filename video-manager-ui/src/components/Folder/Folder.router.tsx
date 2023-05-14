import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { combinePath } from '../../utils/path'

import { FolderWithDrag } from './Folder.drag'
import { FolderProps } from './Folder.ui'

/**
 * Component wrapper managing routing
 */
export const FolderWithRouter = ({ ...props }: FolderProps) => {

   const navigate = useNavigate()

   const { pathname } = useLocation()

   const path = combinePath(pathname, props.name)

   return (
      <FolderWithDrag {...props}
         onClick={() => navigate(path)}
      />
   )
}

FolderWithRouter.defaultProps = {
   ...FolderWithDrag.defaultProps
}