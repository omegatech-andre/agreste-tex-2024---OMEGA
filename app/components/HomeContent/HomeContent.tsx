'use client'
import { useState } from 'react'
import './index.scss'
import BarProgress from '../_ui/barProgress/BarProgress'
import { SiInstagram, SiLinkedin, SiYoutube, SiTiktok, SiWhatsapp, SiFacebook } from "react-icons/si"
import Image from 'next/image'
import Link from 'next/link'

export default function HomeContent() {
  const [isVisible, setIsVisible] = useState(false)

  const toogleFunction = () =>{
    setIsVisible(true)
    // setIsVisible(!isVisible)
  }

  setTimeout(toogleFunction, 3300)

  return (
    <>
      <div className="homecontent">
        <div className={ isVisible ? 'homecontent__mainvisible' : 'homecontent__main'}>
          <div className="top">
            <img src="./logo-oficial.png" alt="" />
            <div className="top__icons">
              <Link href="https://www.instagram.com/omegascreen.ind/" target="_blank"><SiInstagram size={30} /></Link>
              <Link href="https://www.linkedin.com/company/%C3%B4mega-ind%C3%BAstria-e-com%C3%A9rcio-de-tintas-ltda/" target="_blank"><SiLinkedin size={30} /></Link>
              <Link href="https://www.youtube.com/channel/UCwd1QoM-ApQ0c1cBZXpJMKQ" target="_blank"><SiYoutube size={30} /></Link>
              <Link href="https://www.tiktok.com/@omegascreen.ind?is_from_webapp=1&sender_device=pc" target="_blank"><SiTiktok size={30} /></Link>
              <Link href="https://wa.me/5581982810058"><SiWhatsapp size={30} /></Link>
              <Link href="https://www.facebook.com/profile.php?id=100086183216972" target="_blank"><SiFacebook size={30} /></Link>
            </div>
          </div>
          <div className="mid">
            <p>content mid</p>
          </div>
          <div className="bot">
            <h1>Ômega Screen Indústria</h1>
            <p>Sua vida com mais cor e intesidade</p>
            <BarProgress />
          </div>
        </div>
      </div>
      {/* <button onClick={toogleFunction}>toogle</button> */}
    </>
  )
}