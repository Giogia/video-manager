import React from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

interface NameProps {
  /**
   * Folder contents
  */
  defaultName: string
}

/**
 * UI component for a modifiable input
 */
export const Name = ({ defaultName }: NameProps) => {

  const [name, setName] = React.useState(defaultName)
  const [isNameFocused, setIsNamedFocused] = React.useState(false)

  return (
    <Box
      width='100px'
      textAlign='center'
      sx={{ wordBreak: 'break-all' }}
    >
      {!isNameFocused ?
        (
          <Typography
            variant='caption'
            gutterBottom
            onClick={() => setIsNamedFocused(true)}
          >
            {name}
          </Typography>
        ) :
        (
          <TextField
            autoFocus
            value={name}
            variant='standard'
            inputProps={{ style: { fontSize: 12 } }}
            multiline
            maxRows={4}
            margin='none'
            onBlur={() => setIsNamedFocused(false)}
            onChange={({ target }) => setName(target.value)}
            onKeyDown={({ code, shiftKey }) => {
              if (code === 'Enter' && !shiftKey) setIsNamedFocused(false)
            }}
          />
        )
      }
    </Box>
  )
}

Name.defaultProps = {
  defaultName: 'Name'
}