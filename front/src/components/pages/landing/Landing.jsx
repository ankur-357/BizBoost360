// import React from 'react'
import Header from '../../shared/Header/Header'
import "./Landing.component.css"
import Hero from "./components/Hero"
import About from './components/About'
import LandingCard from './components/LandingCard'
const Landing = () => {
  return (
    <div className='landing'>
      <Header />
      <Hero />
      <About />
      <LandingCard />
    </div>
  )
}

export default Landing