import React from 'react'
import Chip from '@mui/material/Chip'
import { useNavigate } from 'react-router-dom'
import { ErrorBoundary, FallbackProps } from 'react-error-boundary'

import { Explorer } from './Explorer.ui'
import { ExplorerWithFetch, WithFetchProps } from './Explorer.fetch'
import { getErrorMessage } from '../../utils/error'

/**
 * Component wrapper for error stage
 */
export const ExplorerError = ({ error, resetErrorBoundary }: FallbackProps) => {

   const message = getErrorMessage(error)

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