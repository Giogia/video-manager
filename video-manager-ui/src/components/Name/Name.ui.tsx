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
   * Name validation error
   */
  error?: string
  /**
   * Action on name changed
   */
  onChange?: (newName: string, oldName: string) => void
}

/**
 * Primary UI component for user typewriting
 */
export const Name = ({ name: defaultName, editable, onChange, error }: NameProps) => {

  const [name, setName] = useState(defaultName)
  const [isFocused, setIsFocused] = useState(false)

  useEffect(() => setName(defaultName), [defaultName])

  return (
    <Box
      textAlign='center'
      width='80px'
      sx={{ wordBreak: 'break-all' }}
    >
      {!isFocused && !error ?
        (
          <Typography
            variant='caption'
            gutterBottom
            onClick={() => setIsFocused(editable!)}
            sx={{ opacity: editable ? 1 : 0.5 }}
          >
            {name}
          </Typography>
        ) :
        (
          <TextField
            autoFocus={!error}
            value={name}
            variant='standard'
            inputProps={{ sx: { fontSize: 12, marginTop: -0.25 } }}
            multiline
            maxRows={4}
            error={!!error}
            helperText={error}
            onBlur={() => setIsFocused(false)}
            onChange={({ target }) => setName(target.value)}
            onKeyDown={({ code, shiftKey }) => {
              if (code === 'Enter' && !shiftKey) {
                setIsFocused(false)
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
  editable: true,
}