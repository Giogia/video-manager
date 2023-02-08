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
   * Name validation error
   */
  error?: string
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
export const Name = ({ name: defaultName, editable, onChange, error, sx }: NameProps) => {

  const [name, setName] = useState(defaultName)
  const [isFocused, setIsFocused] = useState(false)

  useEffect(() => setName(defaultName), [defaultName])

  const editName = () => {
    setIsFocused(false)
    onChange && onChange(name, defaultName)
  }

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
            sx={{ opacity: editable ? 1 : 0.5, ...sx }}
          >
            {name}
          </Typography>
        ) :
        (
          <TextField
            autoFocus={!error}
            value={name}
            variant='standard'
            inputProps={{ sx: { fontSize: 12, marginTop: -0.25, ...sx } }}
            multiline
            maxRows={4}
            error={!!error}
            helperText={error}
            onBlur={editName}
            onChange={({ target }) => setName(target.value)}
            onKeyDown={({ code, shiftKey }) => (code === 'Enter' && !shiftKey) && editName()}
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