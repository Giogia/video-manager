import React from 'react'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

import { Button } from '../Button'
import { RenameFolder } from '../Name'

export interface FolderProps {
  /**
   * The number of items in a folder
   */
  count?: number
  /**
   * Whether the folder is loading
   */
  loading: boolean
  /**
   * Error associated with folder operations
   */
  error?: any
  /**
   * Folder contents
   */
  name: string
  /**
   * Opeartion called when folder is clicked
   */
  onClick?: (e: MouseEvent) => void
  /**
   * Whether the folder has been selected
   */
  selected?: boolean
}

/**
 * UI component for identifying a directory
 */
export const Folder = ({ name, loading, error, onClick, selected, count }: FolderProps) => (
   <Grid container
      direction='column'
      alignItems='center'
      width='max-content'
   >
      <Grid item>
         <Button
            action={onClick}
            disabled={selected}
            error={error}
            icon='folder'
            size='large'
            loading={loading}
            tooltip={false}
         />
      </Grid>
      <Grid item>
         <RenameFolder
            name={name}
            loading={loading}
            editable={!selected}
         />
      </Grid>
      {count !== undefined && !loading &&
      <Grid item>
         <Typography
            variant='caption'
            sx={{ fontSize: 9, opacity: 0.75 }}
         >
            {`${count ? count : 'no'} item${count !== 1 ? 's' : ''}`}
         </Typography>
      </Grid>
      }
   </Grid>
)

Folder.defaultProps = {
   name: 'New Folder',
   loading: false,
   selected: false,
   count: 0
}