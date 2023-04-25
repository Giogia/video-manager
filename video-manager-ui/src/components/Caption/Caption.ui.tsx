import React from 'react'
import Typography from '@mui/material/Typography'

export interface CaptionProps {
   /**
    * Description of the caption
   */
   text: string
}

/**
 * Primary UI component for giving descriptions
 */
export const Caption = ({ text }: CaptionProps) => (
   <Typography
      variant='caption'
      sx={{ fontSize: 9, opacity: 0.75 }}
   >
      {text}
   </Typography>
)

Caption.defaultProps = {
   text: 'caption'
}