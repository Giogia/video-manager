import React from 'react'
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
 * UI component for a modifiable input
 */
export const Name = ({ name: defaultName, editable, onChange }: NameProps) => {

  const [name, setName] = React.useState(defaultName)
  const [isNameFocused, setIsNamedFocused] = React.useState(false)

  return (
    <Box
      textAlign='center'
      maxWidth='100px'
      width='fit-content'
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