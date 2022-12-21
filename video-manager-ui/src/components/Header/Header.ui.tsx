import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import { Button } from '../Button'
import { DeleteFolderChip } from '../Chip'

interface HeaderProps {
  /**
   * Application name
   */
  name: string
  /**
   * Currently selected theme
   */
  theme: 'light' | 'dark'
  /**
   * Switch theme functionality
   */
  handleTheme: () => void
}

/**
 * UI component for identifying a directory
 */
export const Header = ({ name, theme, handleTheme }: HeaderProps) => (
  <>
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <DeleteFolderChip />
    </Box>
    <Box sx={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}>
      <Typography
        variant='overline'
        color="textPrimary"
      >
        {name}
      </Typography>
      <Button
        action={handleTheme}
        icon={`${theme}-theme`}
      />
    </Box>
  </>
)

Header.defaultProps = {
  name: 'Video Manager'
}