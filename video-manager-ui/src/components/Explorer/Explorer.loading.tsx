import React, { Suspense } from 'react'

import { Explorer } from "./Explorer.ui"
import { WithFetchProps } from './Explorer.fetch'
import { Folder } from '../Folder'
import { ExplorerWithError } from './Explorer.error'

const length = Math.floor((window.innerWidth - 100) / 100)

/**
 * Component wrappers for loading stage
 */
export const ExplorerLoading = () => (
    <Explorer loading
        content={Array
            .from({ length })
            .map(() => <Folder loading />)
        }
    />
)

export const ExplorerWithFetchLoading = (props: WithFetchProps) => (
    <Suspense fallback={<ExplorerLoading />}>
        <ExplorerWithError {...props} />
    </Suspense>
)