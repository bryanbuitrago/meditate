'use client'

import Image from 'next/image'
import styles from './page.module.css'
import HomePageGreeting from './components/HomePageGreeting';

export default function Home() {
  return (
    <div>
   <h1>Welcome to the Meditation App</h1>
   <HomePageGreeting />
   </div>
  )
}
