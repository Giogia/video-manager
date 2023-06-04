import React from 'react'
import Typography from '@mui/material/Typography'

export interface CaptionProps {
   /**
    * Whether the caption is active
    */
   disabled?: boolean
   /**
    * Description of the caption
    */
   text: string
}

/**
 * Primary UI component for brief descriptions
 */
export const Caption = ({ text, disabled }: CaptionProps) => (
   <Typography
      variant='caption'
      sx={{ 
         fontSize: 9, 
         opacity: disabled ? 0.5 : 0.75 
      }}
   >
      {text}
   </Typography>
)

Caption.defaultProps = {
   disabled: false,
   text: 'caption'
}