import React from 'react'

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
        <main>
          {children}
        </main>
      </body>
    </html>
  )
}

export default MainLayout