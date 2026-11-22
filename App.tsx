import React, { useState } from 'react'
import { Header } from './components/layout/Header'
import { MobileMenu } from './components/layout/MobileMenu'
import { Footer } from './components/layout/Footer'
import { ProgressBar } from './components/layout/ProgressBar'
import { HomePage } from './pages/home/HomePage'
import { VideoModal } from './components/ui/VideoModal'
import { Drawer, TeamMember } from './components/ui/Drawer'
import { embedUrl } from './script'

export const App: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null)
  const [videoModal, setVideoModal] = useState<{
    isOpen: boolean
    embedUrl: string | null
    externalUrl: string | null
  }>({
    isOpen: false,
    embedUrl: null,
    externalUrl: null,
  })

  const handlePlayVideo = (url: string) => {
    const embed = embedUrl(url)
    if (embed) {
      setVideoModal({
        isOpen: true,
        embedUrl: embed,
        externalUrl: url,
      })
    } else {
      window.open(url, '_blank', 'noopener')
    }
  }

  const handleCloseVideo = () => {
    setVideoModal({
      isOpen: false,
      embedUrl: null,
      externalUrl: null,
    })
  }

  return (
    <>
      <div className="load" aria-hidden="true">
        <b data-t="CROMÁTICA">CROMÁTICA</b>
        <p>Música, filmes e educação.</p>
      </div>

      <ProgressBar />

      <Header
        menuOpen={menuOpen}
        onToggleMenu={() => setMenuOpen((prev) => !prev)}
      />

      <MobileMenu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
      />

      <HomePage
        onPlayVideo={handlePlayVideo}
        onSelectMember={(member) => setSelectedMember(member)}
      />

      <Footer />

      <Drawer
        isOpen={selectedMember !== null}
        member={selectedMember}
        onClose={() => setSelectedMember(null)}
      />

      <VideoModal
        isOpen={videoModal.isOpen}
        embedUrl={videoModal.embedUrl}
        externalUrl={videoModal.externalUrl}
        onClose={handleCloseVideo}
      />
    </>
  )
}

export default App
