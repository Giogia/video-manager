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

  const defaultMode = localStorage.getItem('theme')

  const [theme, setTheme] = useState(defaultMode === 'dark' ? darkTheme : lightTheme)

  const { palette: { mode, background } } = theme

  const handleTheme = () => setTheme(mode === 'dark' ? lightTheme : darkTheme)

  localStorage.setItem('theme', mode)

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
          paddingTop={4}
          paddingBottom={0}
        >
          <Header theme={mode} handleTheme={handleTheme} />
        </Box>
        <Box
          overflow='hidden'
          position='relative'
          height='100%'
          padding={4}
        >
          <Explorer queryRef={explorerRef!} />
        </Box>
      </Box>
    </ThemeProvider >
  )
}