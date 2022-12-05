import React, { ReactNode } from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Grid from '@mui/material/Grid'

import { Button } from '../Button'
import { Path } from '../Path'

interface ExplorerProps {
  /**
   * Explorer content
  */
  content: ReactNode[]
  /**
   * Position in file system
  */
  path: string
}

/**
 * UI component for identifying a directory
 */
export const Explorer = ({ content, path }: ExplorerProps) => {

  return (
    <Card variant='outlined'>
      <CardHeader
        title={<Path path={path} />}
        action={(
          <CardActions>
            <Button type='add-video' />
            <Button type='add-folder' />
          </CardActions>
        )}
      />
      <CardContent sx={{ overflow: 'auto' }}>
        <Grid container gap={4}>
          {content &&
            content.map(item => (
              <Grid item>
                {item}
              </Grid>
            ))
          }
        </Grid>
      </CardContent>
    </Card >
  )
}

Explorer.defaultProps = {
  content: <></>,
  path: '/'
}