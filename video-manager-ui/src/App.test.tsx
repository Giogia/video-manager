import React from 'react'
import { render, screen } from '@testing-library/react'
import {AppWithRouter} from './App.router'

test('renders learn react link', () => {
  render(<AppWithRouter />)
  const linkElement = screen.getByText(/learn react/i)
  expect(linkElement).toBeInTheDocument()
})
