import React from 'react'
import Chip from "@mui/material/Chip"

import { Explorer } from "./Explorer.ui"

/**
 * Component wrapper for error stage
 */
export const ExplorerError = ({ error, resetErrorBoundary }: Record<string, any>) => (
    <Explorer error
        content={
            <>
                <pre>{error.message}</pre>
                <Chip
                    label="Try Again"
                    onClick={resetErrorBoundary}
                />
            </>
        }
    />
)