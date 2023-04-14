import React, { ReactNode } from 'react'
import MuiChip from '@mui/material/Chip'
import Tooltip from '@mui/material/Tooltip'
import { SxProps, Theme } from '@mui/material'

import { Icon, icons } from '../Icon'
import { formatName } from '../../utils/name'

export interface ChipProps {
  /**
   * Chip functionality
   */
  action?: (e: any) => void
  /**
   * Whether the chip is active
   */
  disabled?: boolean
  /**
   * Illustration of the chip
   */
  icon: keyof typeof icons
  /**
   * Text present on the chip
   */
  label?: ReactNode,
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
export const Chip = ({ action, icon, disabled, label, tooltip, sx }: ChipProps) => (
  <Tooltip title={tooltip}>
    <span id={`${icon}-chip`}>
      <MuiChip
        clickable
        icon={<Icon id={icon} sx={{color: 'action'}}/>}
        label={label || formatName(icon)}
        disabled={disabled}
        onClick={action}
        sx={{ paddingLeft: 1, ...sx }}
      />
    </span>
  </Tooltip>
)

Chip.defaultProps = {
  color: 'default'
}