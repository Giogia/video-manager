import React, { ReactNode } from 'react'

import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Grid from '@mui/material/Grid'

import { Button } from '../Button'
import { Breadcrumbs } from '../Breadcrumbs'

interface ExplorerProps {
  /**
   * Explorer content
   */
  content: ReactNode
  /**
   * Is the explorer on error?
   */
  error: boolean
  /**
   * Is the explorer loading?
   */
  loading: boolean
  /**
   * Position in file system
   */
  path: string
}

/**
 * UI component for exploring a directory
 */
export const Explorer = ({ content, path, loading, error }: ExplorerProps) => (
  <Card variant='outlined' sx={{ height: '100%' }}>
    <CardHeader
      title={<Breadcrumbs path={path} />}
      action={(
        <CardActions>
          <Button type='add-video' />
          <Button type='add-folder' />
        </CardActions>
      )}
    />
    <CardContent sx={{
      height: '100%',
      overflow: 'auto',
      ...(loading || error) && {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2
      }
    }}>
      {content && Array.isArray(content) ?
        <Grid container gap={4}>
          {content.map(item =>
            <Grid item>{item}</Grid>
          )}
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