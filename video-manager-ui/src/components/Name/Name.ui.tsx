import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { SxProps, Theme } from '@mui/material'

export interface NameProps {
   /**
    * Folder contents
   */
   name: string
   /**
    * Whether the name is editable
    */
   editable?: boolean
   /**
    * Action on name changed
    */
   onChange?: (newName: string, oldName: string) => void
   /**
    * Customize name themed style
    */
   sx?: SxProps<Theme>,
}

/**
 * Primary UI component for user typewriting
 */
export const Name = ({ name: defaultName, editable, onChange, sx }: NameProps) => {

   const [name, setName] = useState(defaultName)
   const [isFocused, setIsFocused] = useState(false)

   useEffect(() => setName(defaultName), [defaultName])

   const editName = () => {
      setIsFocused(false)
      onChange && onChange(name, defaultName)
      setName(defaultName)
   }

   return (
      <Box
         textAlign='center'
         width={100}
         sx={{ wordBreak: 'break-word' }}
      >
         {!isFocused ?
            <Typography
               variant='caption'
               gutterBottom
               onClick={() => setIsFocused(editable!)}
               sx={{ opacity: editable ? 1 : 0.5, ...sx }}
            >
               {name}
            </Typography> :
            <TextField
               autoFocus
               value={name}
               variant='standard'
               inputProps={{
                  sx: { fontSize: 12, marginTop: -0.25, ...sx },
                  role: 'input'
               }}
               multiline
               maxRows={4}
               onBlur={editName}
               onChange={({ target }) => setName(target.value)}
               onKeyDown={({ code, shiftKey }) => (code === 'Enter' && !shiftKey) && editName()}
            />
         }
      </Box>
   )
}

Name.defaultProps = {
   name: 'Name',
   editable: true,
}