import React from 'react'
import MuiChip from '@mui/material/Chip'
import Tooltip from '@mui/material/Tooltip'

import { Icon, icons } from '../Icon'
import { formatName } from '../../utils/name'

export interface ChipProps {
  /**
   * Whether the chip is active
   */
  disabled?: boolean
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
  /**
   * Message to show when hovering the chip
   */
  tooltip?: string
}

/**
 * Primary UI component for user interaction
 */
export const Chip = ({ icon, color, disabled, tooltip, sx }: ChipProps) => (
  <Tooltip title={tooltip}>
    <span>
      <MuiChip
        icon={<Icon id={icon} />}
        label={formatName(icon)}
        disabled={disabled}
        color={color}
        variant='outlined'
        sx={sx}
      />
    </span>
  </Tooltip>
)

Chip.defaultProps = {
  color: 'default'
}