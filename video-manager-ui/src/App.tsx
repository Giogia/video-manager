import React, { useState } from 'react'
import { Box, ThemeProvider } from '@mui/material'

import { Header } from './components/Header'
import { Folder } from './components/Folder'
import { Explorer } from './components/Explorer'
import { lightTheme } from './themes/light.theme'
import { darkTheme } from './themes/dark.theme'

function App() {
  const [theme, setTheme] = useState(lightTheme)

  const { palette: { mode, background } } = theme

  const handleTheme = () => setTheme(mode === 'dark' ? lightTheme : darkTheme)

  // Example Content
  const content = Array.from({ length: 100 }).map((_, i) => <Folder />)
  const path = window.location.pathname

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        bgcolor: background.default,
        height: '100vh',
      }}>
        <Box
          padding={8}
          paddingBottom={0}
        >
          <Header theme={mode} handleTheme={handleTheme} />
        </Box>
        <Box
          flex={1}
          overflow='auto'
          padding={6}
          paddingBottom={8}
        >
          <Explorer content={content} path={path} />
        </Box>
      </Box>
    </ThemeProvider >
  )
}

export default App
