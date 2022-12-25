import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

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
}

/**
 * Primary UI component for user typewriting
 */
export const Name = ({ name: defaultName, editable, onChange }: NameProps) => {

  const [name, setName] = useState(defaultName)
  const [isNameFocused, setIsNamedFocused] = useState(false)

  useEffect(() => setName(defaultName), [defaultName])

  return (
    <Box
      textAlign='center'
      width='80px'
      sx={{ wordBreak: 'break-all' }}
    >
      {!isNameFocused ?
        (
          <Typography
            variant='caption'
            gutterBottom
            onClick={() => setIsNamedFocused(editable!)}
          >
            {name}
          </Typography>
        ) :
        (
          <TextField
            autoFocus
            value={name}
            variant='standard'
            inputProps={{ sx: { fontSize: 12, marginTop: -0.25 } }}
            multiline
            maxRows={4}
            onBlur={() => setIsNamedFocused(false)}
            onChange={({ target }) => setName(target.value)}
            onKeyDown={({ code, shiftKey }) => {
              if (code === 'Enter' && !shiftKey) {
                setIsNamedFocused(false)
                onChange && onChange(name, defaultName)
              }
            }}
          />
        )
      }
    </Box>
  )
}

Name.defaultProps = {
  name: 'Name',
  editable: true
}