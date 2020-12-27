import React from 'react'
import '../css/Whatsapp.css'
import Chat from './Chat'
import Sidebar from './Sidebar'

function Whatsapp() {
  return (
    <div className='whatsapp'>
      <Sidebar />
      <Chat />
    </div>
  )
}

export default Whatsapp
