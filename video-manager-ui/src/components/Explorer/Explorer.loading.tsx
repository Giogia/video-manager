import React, { Suspense } from 'react'

import { Explorer } from './Explorer.ui'
import { WithFetchProps } from './Explorer.fetch'
import { Folder } from '../Folder'
import { ExplorerWithError } from './Explorer.error'

/**
 * Represents the number of elements used to compose a loading skeleton,
 * based on the width of the window.
 */
const length = Math.floor((window.innerWidth - 100) / 100)

/**
 * Component wrappers for loading stage
 */
export const ExplorerLoading = () => (
   <Explorer loading
      content={Array
         .from({ length })
         .map((_, i) => <Folder loading key={i} />)
      }
   />
)

export const ExplorerWithFetchLoading = (props: WithFetchProps) => (
   <Suspense
      fallback={<ExplorerLoading />}
   >
      <ExplorerWithError {...props} />
   </Suspense>
)