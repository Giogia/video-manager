import React from 'react'
import Grid from '@mui/material/Grid'

import { Button } from '../Button'
import { RenameFolder } from '../Name'
import { Caption } from '../Caption'
import { Error } from '../../utils/error'

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
   error?: Error
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
      {count !== undefined &&
         <Grid item>
            <Caption
               text={`${count ? count : 'no'} item${count !== 1 ? 's' : ''}`}
               loading={loading}
            />
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