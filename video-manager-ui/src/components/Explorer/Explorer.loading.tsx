import React from 'react'
import CircularProgress from '@mui/material/CircularProgress'

import { Explorer } from "."

/**
 * Component wrapper for loading stage
 */
export const ExplorerLoading = () => (
    <Explorer loading content={
        <>
            <CircularProgress/>
            {'Loading...'}
        </>
    } />
)