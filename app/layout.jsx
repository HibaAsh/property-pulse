import React from 'react'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

import '@/assets/styles/globals.css'

export const metadata = {
  title: 'Property Pulse | Find The Perfect Rental',
  description: 'Fidn your dream rental property',
  keywords: 'rental, find rentals, find properties'
}

const MainLayout = ({ children }) => {
  return (
    <html lang='en'>
      <body>
        <Navbar />

        <main className='p-2'>
          {children}
        </main>

        <Footer />
      </body>
    </html>
  )
}

export default MainLayout