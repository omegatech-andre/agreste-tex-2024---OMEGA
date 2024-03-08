import HomeContent from './components/HomeContent/HomeContent'
import './index.scss'

export default function Home() {
  return (
    <>
      <div className="home">
        <div className="home__content">
          <HomeContent />
        </div>
      </div>
    </>
  )
}