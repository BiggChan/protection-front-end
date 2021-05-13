import React, { FC } from 'react'
import Navigation from './Navigation'
import Header from './Header'

interface Props {
  children: React.ReactNode | string
}

const Layout: FC<Props> = ({ children }) => {
  return (
    <div>
      <Navigation />
      <Header />
      {children}
    </div>
  )
}

export default Layout
