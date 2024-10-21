import React from 'react'
import logo from '@/app/publics/img/logo/logo cua thu-05.png'
import Image from 'next/image'
export default function Header() {
  return (
    <div className='py-3 ' >
    
    <Image src={logo} width={250} alt='logo admin'/>
        
    </div>
  )
}
