import React from 'react'

import { Explorer } from "."
import { Folder } from '../Folder'

/**
 * Component wrapper for loading stage
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