import React from 'react'
import MuiChip from '@mui/material/Chip'
import Tooltip from '@mui/material/Tooltip'
import { SxProps, Theme } from '@mui/material'

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
   * Customize chip themed style
   */
  sx?: SxProps<Theme>,
  /**
   * Message to show when hovering the chip
   */
  tooltip?: string
}

/**
 * Primary UI component for user interaction
 */
export const Chip = ({ icon, disabled, tooltip, sx }: ChipProps) => (
  <Tooltip title={tooltip}>
    <span>
      <MuiChip
        icon={<Icon id={icon} />}
        label={formatName(icon)}
        disabled={disabled}
        sx={{paddingLeft: 1, ...sx}}
      />
    </span>
  </Tooltip>
)

Chip.defaultProps = {
  color: 'default'
}