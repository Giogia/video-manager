import React, { useState } from 'react'
import { PreloadedQuery } from 'react-relay'
import { Box, ThemeProvider } from '@mui/material'

import { ExplorerQuery } from './components/Explorer/__generated__/ExplorerQuery.graphql'

import { Header } from './components/Header'
import { Explorer } from './components/Explorer'
import { lightTheme } from './themes/light.theme'
import { darkTheme } from './themes/dark.theme'


export interface AppProps {
  /**
   * explorer fragment reference
   */
  explorerRef?: PreloadedQuery<ExplorerQuery>
}

export const App = ({ explorerRef }: AppProps) => {
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
          padding={3}
        >
          <Explorer queryRef={explorerRef!} />
        </Box>
      </Box>
    </ThemeProvider >
  )
}