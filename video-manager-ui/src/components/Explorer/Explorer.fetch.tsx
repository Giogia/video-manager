import React from 'react'
import { graphql } from 'babel-plugin-relay/macro'
import { PreloadedQuery, usePreloadedQuery, useFragment } from 'react-relay'

import { Explorer_directory$key } from './__generated__/Explorer_directory.graphql'
import { ExplorerQuery } from './__generated__/ExplorerQuery.graphql'

import { Explorer } from './Explorer.ui'
import { FolderWithFetch } from '../Folder'

/**
 * Data fetching logic
 */
const query = (
    graphql`
    query ExplorerQuery($path: String!) {
      getDirectory(input: {path: $path}){
        ...Explorer_directory
      }
    }
  `
)
const fragment = (
    graphql`
    fragment Explorer_directory on Directory{
        id
        children{
            ...Folder
        }
    }
  `
)

export interface WithFetchProps {
    /**
     * Query reference for data fetching
     */
    queryRef: PreloadedQuery<ExplorerQuery>
}

/**
 * Component wrapper fetching data
 */
export const ExplorerWithFetch = ({ queryRef }: WithFetchProps) => {
    const { getDirectory } = usePreloadedQuery<ExplorerQuery>(query, queryRef)
    const { children } = useFragment<Explorer_directory$key>(fragment, getDirectory)

    return (
        <Explorer
            path={window.location.pathname}
            content={
                children.map((child, i) =>
                    <FolderWithFetch
                        fragmentRef={child}
                        key={i}
                    />
                )
            }
        />
    )
}