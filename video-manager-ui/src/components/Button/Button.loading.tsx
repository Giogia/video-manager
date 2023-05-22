import React from 'react'
import Box from '@mui/material/Box'
import Skeleton from '@mui/material/Skeleton'

import { Button, ButtonProps } from './Button.ui'

interface WithLoadingProps {
   /**
    * Whether the button is loading
    */
   loading: boolean
}

/**
 * Component Wrapper for loading stage
 */
export const ButtonWithLoading = ({ loading, ...props }: ButtonProps & WithLoadingProps) => (
   <Box sx={{ ...loading && { position: 'relative' } }}>
      {loading ?
         <>
            <Skeleton
               variant='circular'
               sx={{ position: 'absolute', top: 0, left: 0 }}
            >
               <Button {...props} disabled />
            </Skeleton>
            <Button {...props} disabled />
         </>
         : <Button {...props} />
      }
   </Box>
)

ButtonWithLoading.defaultProps = {
   ...Button.defaultProps,
   loading: false
}