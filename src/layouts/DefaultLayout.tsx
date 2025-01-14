import React from 'react'
import { Outlet } from 'react-router'

function DefaultLayout() {
  return (
    <div>
      <header>
        <h1>My Site</h1>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default DefaultLayout