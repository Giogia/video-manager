import React from 'react'
import Chip from "@mui/material/Chip"
import { useNavigate } from 'react-router'
import { ErrorBoundary } from 'react-error-boundary'

import { Explorer } from "./Explorer.ui"
import { ExplorerWithFetch, WithFetchProps } from './Explorer.fetch'

/**
 * Component wrapper for error stage
 */
export const ExplorerError = ({ error, resetErrorBoundary }: Record<string, any>) => {

    const [{ message }] = error?.source?.errors || [{}]

    const navigate = useNavigate()

    return (
        <Explorer error
            content={
                <>
                    <pre style={{ whiteSpace: 'pre-line' }}>
                        {message || error.message}
                    </pre>
                    <Chip
                        label="Try Again"
                        onClick={() => {
                            resetErrorBoundary()
                            navigate(0)
                        }}
                    />
                </>
            }
        />
    )
}

/**
 * Component wrapper handling errors
 */
export const ExplorerWithError = ({ ...props }: WithFetchProps) => (
    <ErrorBoundary
        FallbackComponent={ExplorerError}
    >
        <ExplorerWithFetch {...props} />
    </ErrorBoundary>
)