import React from 'react'
import { useNavigate } from 'react-router-dom'

import { FolderWithDrag } from './Folder.drag'
import { FolderProps } from './Folder.ui'

export interface WithRouterProps {
  /**
   * directory location
   */
  path: string
}

/**
 * Component wrapper managing routing
 */
export const FolderWithRouter = ({ ...props }: FolderProps & WithRouterProps) => {

  const navigate = useNavigate()

  return (
    <FolderWithDrag {...props}
      onClick={() => navigate(props.path)}
    />
  )
}

FolderWithRouter.defaultProps = {
  ...FolderWithDrag.defaultProps
}