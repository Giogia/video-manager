import React, { Suspense } from 'react'

import { Explorer } from "./Explorer.ui"
import { WithFetchProps } from './Explorer.fetch'
import { Folder } from '../Folder'
import { ExplorerWithError } from './Explorer.error'

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
    <Suspense fallback={<ExplorerLoading />}>
        <ExplorerWithError {...props} />
    </Suspense>
)