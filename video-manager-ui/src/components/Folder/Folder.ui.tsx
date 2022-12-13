import React from 'react'
import Grid from '@mui/material/Grid'

import { Button } from '../Button'
import { Name } from '../Name'

export interface FolderProps {
  /**
   * Folder contents
  */
  name: string
  /**
   * Whether the folder is loading
   */
  loading: boolean
}

/**
 * UI component for identifying a directory
 */
export const Folder = ({ name, loading }: FolderProps) => {
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
          tooltip={false}
        />
      </Grid>
      <Grid item>
        <Name
          name={name}
          loading={loading}
        />
      </Grid>
    </Grid>
  )
}

Folder.defaultProps = {
  name: 'New Folder',
  loading: false
}