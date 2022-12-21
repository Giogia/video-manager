import React from 'react'
import Box from '@mui/material/Box'

import { DeleteFolderChip } from '../Chip'
import { Header, HeaderProps } from './Header.ui'

/**
 * Component Wrapper for dropping a folder
 */
export const HeaderWithDrop = ({ ...props }: HeaderProps) => (
  <>
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <DeleteFolderChip />
    </Box>
    <Header {...props} />
  </>
)

HeaderWithDrop.defaultProps = {
  ...Header.defaultProps
}