import React from 'react'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'

import { Icon, icons } from '../Icon'
import { formatName } from '../../utils/name'
import { SxProps, Theme } from '@mui/material'
export interface ButtonProps {
  /**
   * Button functionality
   */
  action?: (e: any) => void
  /**
   * Whether the button is active
   */
  disabled?: boolean
  /**
   * Button icon
   */
  icon: keyof typeof icons
  /**
   * Button dimension
   */
  size?: 'small' | 'medium' | 'large',
  /**
   * Customize button themed style
   */
  sx?: SxProps<Theme>,
  /**
   * Whether to show a button description on hover
   */
  tooltip: boolean
}

/**
 * Primary UI component for user interaction
 */
export const Button = ({ action, size, icon, disabled, tooltip, sx }: ButtonProps) => (
   <Tooltip title={tooltip && formatName(icon)}>
      <span>
         <IconButton
            id={`${icon}-button`}
            disabled={disabled}
            onClick={action}
            sx={sx}
         >
            <Icon
               id={icon}
               size={size}
            />
         </IconButton>
      </span>
   </Tooltip>
)

Button.defaultProps = {
   disabled: false,
   size: 'medium',
   tooltip: true
}