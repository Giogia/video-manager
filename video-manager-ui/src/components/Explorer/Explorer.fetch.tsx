import React from 'react'
import { graphql } from 'babel-plugin-relay/macro'
import { useFragment } from 'react-relay'
import { withErrorBoundary } from 'react-error-boundary'

import { Explorer_directory$key } from './__generated__/Explorer_directory.graphql'

import { Explorer } from './Explorer.ui'
import { ExplorerError } from './Explorer.error'
import { FolderWithFetch } from '../Folder'

/**
 * Data fetching logic
 */
const fragment = (
    graphql`
    fragment Explorer_directory on Directory{
        id
        path
        children{
            ...Folder_name
        }
    }
  `
)

export interface WithFetchProps {
    /**
     * Query reference for data fetching
     */
    fragmentRef: Explorer_directory$key
}

/**
 * Component wrapper fetching data
 */
export const ExplorerWithFetch = withErrorBoundary(({ fragmentRef }: WithFetchProps) => {
    const { path, children } = useFragment<Explorer_directory$key>(fragment, fragmentRef)

    return (
        <Explorer
            path={path}
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
}, {
    FallbackComponent: ExplorerError,
    onError(error, info) { }
})