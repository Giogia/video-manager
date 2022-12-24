import React from 'react'
import Grid from '@mui/material/Grid'

import { Button } from '../Button'
import { Name } from '../Name'

export interface FolderProps {
  /**
   * Whether the folder is loading
   */
  loading: boolean
  /**
   * Folder contents
   */
  name: string
  /**
   * Opeartion called when folder is clicked
   */
  onClick?: (e: MouseEvent) => void
}

/**
 * UI component for identifying a directory
 */
export const Folder = ({ name, loading, onClick }: FolderProps) => (
  <Grid container
    direction='column'
    alignItems='center'
    width='max-content'
  >
    <Grid item>
      <Button
        action={onClick}
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

Folder.defaultProps = {
  name: 'New Folder',
  loading: false
}