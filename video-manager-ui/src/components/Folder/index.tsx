import React from 'react'
import Grid from '@mui/material/Grid'

import { Button } from '../Button'
import { Name } from '../Name'

interface FolderProps {
  /**
   * Folder contents
  */
  defaultName: string
  /**
   * Whether the folder is loading
   */
  loading: boolean
}

/**
 * UI component for identifying a directory
 */
export const Folder = ({ defaultName, loading }: FolderProps) => {
  return (
    <Grid container
      direction='column'
      alignItems='center'
      width='max-content'
    >
      <Grid item>
        <Button
          icon='folder'
          size='large'
          loading={loading}
        />
      </Grid>
      <Grid item>
        <Name
          defaultName={defaultName}
          loading={loading}
        />
      </Grid>
    </Grid>
  )
}

Folder.defaultProps = {
  defaultName: 'New Folder',
  loading: false
}