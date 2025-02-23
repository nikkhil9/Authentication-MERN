import React from 'react'
import Navba from '../components/Navba'
import Header from '../components/Header'

const Home = () => {
  return (
    <div className='felx felx-col items-center justify-center min-h-screen bg-[url("/bg_img.png")] bg-cover bg-center'>
      <Navba/>
      <Header/>
    </div>
  )
}

export default Home
