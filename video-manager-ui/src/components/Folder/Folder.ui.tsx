import React from 'react'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

import { Button } from '../Button'
import { Name } from '../Name'

export interface FolderProps {
  /**
   * Whether the folder is loading
   */
  count?: number
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
export const Folder = ({ name, loading, onClick, count }: FolderProps) => (
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
    {count !== undefined &&
      <Grid item>
        <Typography
          variant='caption'
          sx={{ fontSize: 9, opacity: 0.75 }}
        >
          {`${count > 0 ? count : 'no'} items`}
        </Typography>
      </Grid>
    }
  </Grid>
)

Folder.defaultProps = {
  name: 'New Folder',
  loading: false
}