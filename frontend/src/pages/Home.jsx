import React from 'react'
import Header from '../components/Header'
import SpecialityMenu from '../components/specialityMenu'
import TopTherapists from '../components/TopTherapists'
import Banner from '../components/Banner'

function Home() {
  return (
    <div>
      <Header />
      <SpecialityMenu />
      <TopTherapists />
      <Banner />
    </div>
  )
}

export default Home