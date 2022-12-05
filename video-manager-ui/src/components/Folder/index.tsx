import React from 'react'
import FolderIcon from '@mui/icons-material/Folder'
import Grid from '@mui/material/Grid'

import { Name } from '../Name'

interface FolderProps {
  /**
   * Folder contents
  */
  defaultName: string
}

/**
 * UI component for identifying a directory
 */
export const Folder = ({ defaultName }: FolderProps) => {
  return (
    <Grid container
      direction='column'
      alignItems='center'
      width='max-content'
    >
      <Grid item>
        <FolderIcon
          color='action'
          fontSize='large'
        />
      </Grid>
      <Grid item>
        <Name defaultName={defaultName} />
      </Grid>
    </Grid>
  )
}

Folder.defaultProps = {
  defaultName: 'New Folder'
}