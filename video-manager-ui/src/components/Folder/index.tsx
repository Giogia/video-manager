import React from 'react'
import Grid from '@mui/material/Grid'

import { Button } from '../Button'
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
        <Button icon='folder' size='large' />
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