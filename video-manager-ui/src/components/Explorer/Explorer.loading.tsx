import React, { Suspense } from 'react'

import { Explorer } from "./Explorer.ui"
import { ExplorerWithFetch, WithFetchProps } from './Explorer.fetch'
import { Folder } from '../Folder'

/**
 * Component wrappers for loading stage
 */
export const ExplorerLoading = () => (
    <Explorer loading
        content={
            Array.from({ length: 10 }).map((_, i) =>
                <Folder loading />
            )
        }
    />
)

export const ExplorerWithFetchLoading = (props: WithFetchProps) => (
    <Suspense fallback={
        <Explorer loading
            content={
                Array.from({ length: 10 }).map((_, i) =>
                    <Folder loading />
                )
            }
        />
    }>
        <ExplorerWithFetch {...props} />
    </Suspense>
)