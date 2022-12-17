import React, { useState } from 'react'
import env from "react-dotenv"
import { Box, ThemeProvider } from '@mui/material'
import { loadQuery } from 'react-relay'

import ExplorerSchema, { ExplorerQuery } from './components/Explorer/__generated__/ExplorerQuery.graphql'
import environment from './environment'
import { Header } from './components/Header'
import { Explorer } from './components/Explorer'
import { lightTheme } from './themes/light.theme'
import { darkTheme } from './themes/dark.theme'

const explorerQueryRef = loadQuery<ExplorerQuery>(environment, ExplorerSchema, {
  path: window.location.pathname,
  name: env.DEFAULT_FOLDER
})

function App() {
  const [theme, setTheme] = useState(lightTheme)

  const { palette: { mode, background } } = theme

  const handleTheme = () => setTheme(mode === 'dark' ? lightTheme : darkTheme)

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        bgcolor: background.default,
        height: '100vh',
      }}>
        <Box
          padding={6}
          paddingBottom={0}
        >
          <Header theme={mode} handleTheme={handleTheme} />
        </Box>
        <Box
          flex={1}
          overflow='auto'
          padding={4}
        >
          <Explorer queryRef={explorerQueryRef} />
        </Box>
      </Box>
    </ThemeProvider >
  )
}

export default App
