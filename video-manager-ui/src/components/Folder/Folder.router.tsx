import React from 'react'
import { useNavigate } from 'react-router-dom'
import { combinePath } from '../../utils/path'

import { FolderWithDrag } from './Folder.drag'
import { FolderProps } from './Folder.ui'

/**
 * Component wrapper managing routing
 */
export const FolderWithRouter = ({ ...props }: FolderProps) => {

  const navigate = useNavigate()

  const path = combinePath(window.location.pathname, props.name)

  return (
    <FolderWithDrag {...props}
      onClick={() => navigate(path)}
    />
  )
}

FolderWithRouter.defaultProps = {
  ...FolderWithDrag.defaultProps
}