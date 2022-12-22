import React from 'react'
import Chip from "@mui/material/Chip"
import { useNavigate } from 'react-router'

import { Explorer } from "./Explorer.ui"

/**
 * Component wrapper for error stage
 */
export const ExplorerError = ({ error, resetErrorBoundary }: Record<string, any>) => {

    const navigate = useNavigate()

    return (
        <Explorer error
            content={
                <>
                    <pre style={{ whiteSpace: 'pre-line' }}>
                        {error.message}
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