import { createTheme } from '@mui/material'
import { baseTheme } from './base.theme'

export const darkTheme = createTheme({
   ...baseTheme,
   palette: {
      mode: 'dark',
      background: {
         default: '#202124',
         paper: '#35363A'
      }
   }
})