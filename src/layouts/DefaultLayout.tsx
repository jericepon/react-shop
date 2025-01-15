import Navbar from '@/components/shared/Navbar'
import { Outlet } from 'react-router'

function DefaultLayout() {
  return (
    <>
      <Navbar />
      <main className='pt-[80px]'>
        <Outlet />
      </main>
    </>
  )
}

export default DefaultLayout