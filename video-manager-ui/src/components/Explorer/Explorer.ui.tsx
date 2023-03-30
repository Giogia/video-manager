import React, { ReactNode } from 'react'

import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Grid from '@mui/material/Grid'

import { AddFolderButton, UploadVideoButton } from '../Button'
import { Breadcrumbs } from '../Breadcrumbs'
import { DeleteFolderChip } from '../Chip'

interface ExplorerProps {
  /**
   * Explorer content
   */
  content: ReactNode
  /**
   * Whether the explorer is on error
   */
  error?: boolean
  /**
   * Whether the explorer is loading
   */
  loading?: boolean
  /**
   * Position in file system
   */
  path: string
  /**
   * Explorer identifier
   */
  id?: string
}

/**
 * UI component for exploring a directory
 */
export const Explorer = ({ content, path, loading, error, id }: ExplorerProps) => (
  <Card id='explorer'
    variant='outlined'
    sx={{
      position: 'relative',
      overflow: 'hidden',
      height: '100%',
      border: 'transparent'
    }}>
    <CardHeader
      title={
        <Breadcrumbs
          path={path}
          loading={loading && path !== window.location.pathname}
        />
      }
      action={
        <CardActions sx={{ gap: 2 }} >
          <DeleteFolderChip />
          <UploadVideoButton
            disabled={loading || error}
          />
          <AddFolderButton
            disabled={loading || error}
            optimisticResponse={{ id, children: (Array.isArray(content) ? content : [content]) }}
          />
        </CardActions>
      }
      sx={{ padding: 4 }}
    />
    <CardContent sx={{
      height: '100%',
      flex: 1,
      overflow: 'auto',
      padding: 6,
      ...error && {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: 'min-content',
        gap: 2
      }
    }}>
      {content &&
        Array.isArray(content) ?
        <Grid container gap={4}>
          {
            content.map((item, i) =>
              <Grid item key={i}>
                {item}
              </Grid>
            )
          }
        </Grid> :
        <>{content}</>
      }
    </CardContent>
  </Card>
)

Explorer.defaultProps = {
  content: <></>,
  path: '/',
  loading: false,
  error: false
}