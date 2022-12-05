import React, { useState } from 'react'
import { ThemeProvider } from '@mui/material'
import Container from '@mui/material/Container'

import { Header } from './components/Header'
import { Explorer } from './components/Explorer'
import { lightTheme } from './themes/light.theme'
import { darkTheme } from './themes/dark.theme'

function App() {
  const [theme, setTheme] = useState(lightTheme)

  const { palette: { mode, background } } = theme

  const handleTheme = () => setTheme(mode === 'dark' ? lightTheme : darkTheme)

  return (
    <div className="App">
      <header className="App-header">
        <ThemeProvider theme={theme}>
          <Container sx={{
            height: '100vh',
            bgcolor: background.default
          }}>
            <Header theme={mode} handleTheme={handleTheme} />
            <Explorer content={[]} path='/' />
          </Container>
        </ThemeProvider>
      </header>
    </div>
  )
}

export default App
