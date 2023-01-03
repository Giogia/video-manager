import React, { useState } from 'react'
import { PreloadedQuery } from 'react-relay'
import { Box, ThemeProvider } from '@mui/material'

import { ExplorerQuery } from '../components/Explorer/__generated__/ExplorerQuery.graphql'

import { Header } from '../components/Header'
import { Explorer } from '../components/Explorer'
import { getBrowserTheme, toggleMuiTheme } from '../utils/theme'

export interface AppProps {
  /**
   * explorer fragment reference
   */
  explorerQueryRef: PreloadedQuery<ExplorerQuery>
}

export const App = ({ explorerQueryRef }: AppProps) => {

  const defaultTheme = getBrowserTheme()
  const [muiTheme, setMuiTheme] = useState(defaultTheme)

  const { palette: { mode: currentMode, background } } = muiTheme

  const handleTheme = () => setMuiTheme(toggleMuiTheme(currentMode))

  return (
    <ThemeProvider theme={muiTheme}>
      <Box
        display='flex'
        flexDirection='column'
        bgcolor={background.default}
        height='100vh'
      >
        <Box
          padding={6}
          paddingTop={4}
          paddingBottom={1}
        >
          <Header
            theme={currentMode}
            handleTheme={handleTheme}
          />
        </Box>
        <Box
          overflow='hidden'
          position='relative'
          height='100%'
          padding={2}
        >
          <Explorer
            queryRef={explorerQueryRef}
          />
        </Box>
      </Box>
    </ThemeProvider >
  )
}