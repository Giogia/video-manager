import React, { ReactNode } from 'react'
import { graphql } from 'babel-plugin-relay/macro'
import { PreloadedQuery, usePreloadedQuery } from 'react-relay'
import { ExplorerQuery } from './__generated__/ExplorerQuery.graphql'

import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Grid from '@mui/material/Grid'

import { Button } from '../Button'
import { Breadcrumbs } from '../Breadcrumbs'
import { Folder } from '../Folder'

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
 * UI component for exploring a directory
 */
export const Explorer = ({ content, path }: ExplorerProps) => (
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
      overflow: 'auto'
    }}>
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
  </Card>
)

Explorer.defaultProps = {
  content: <></>,
  path: '/'
}

/**
 * Data fetching logic
 */
const query = (
  graphql`
    query ExplorerQuery($path: String!, $name: String!) {
      getDirectory(input: {path: $path, name: $name}){
        path
        children {
          name
        }
      }
    }
  `
)

interface WithFetchProps {
  /**
   * Query reference for data fetching
  */
  queryRef: PreloadedQuery<ExplorerQuery>
}

/**
 * Component wrapper fetching data
 */
export const ExplorerWithFetch = ({ queryRef }: WithFetchProps) => {
  const { getDirectory: { path, children } } = usePreloadedQuery<ExplorerQuery>(query, queryRef)

  return (
    <Explorer
      path={path}
      content={
        children.map(({ name }) =>
          <Folder defaultName={name} />)
      }
    />
  )
}