import React from 'react'
import MuiChip from '@mui/material/Chip'

import { Icon, icons } from '../Icon'
import { formatName } from '../../utils/name'

export interface ChipProps {
  /**
   * Illustration of the chip
   */
  icon: keyof typeof icons
  /**
   * Color of the chip
   */
  color?: 'error' | 'default'
  /**
   * Style to apply to chip
   */
  sx?: object
}

/**
 * Primary UI component for user interaction
 */
export const Chip = ({ icon, color, sx }: ChipProps) => (
  <MuiChip
    icon={<Icon id={icon} />}
    label={formatName(icon)}
    color={color}
    variant='outlined'
    sx={sx}
  />
)

Chip.defaultProps = {
  color: 'default'
}