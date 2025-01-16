import Navbar from '@/components/shared/Navbar'
import { Toaster } from '@/components/ui/toaster'
import { Outlet } from 'react-router'

function DefaultLayout() {
  return (
    <>
      <Navbar />
      <main className='pt-[80px]'>
        <Outlet />
      </main>
      <Toaster />
    </>
  )
}

export default DefaultLayout