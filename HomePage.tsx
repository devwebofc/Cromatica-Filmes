import React from 'react'
import { CoverSection } from './components/CoverSection'
import { IntroSection } from './components/IntroSection'
import { ChaptersSection } from './components/ChaptersSection'
import { WheelSection } from './components/WheelSection'
import { FilmesSection } from './components/FilmesSection'
import { VideoSection } from './components/VideoSection'
import { NovelasSection } from './components/NovelasSection'
import { FestivalSection } from './components/FestivalSection'
import { TeamSection } from './components/TeamSection'
import { StepsSection } from './components/StepsSection'
import { TestimonialsSection } from './components/TestimonialsSection'
import { FaqSection } from './components/FaqSection'
import { ContactSection } from './components/ContactSection'
import { TeamMember } from '../../components/ui/Drawer'

interface HomePageProps {
  onPlayVideo: (url: string) => void
  onSelectMember: (member: TeamMember) => void
}

export const HomePage: React.FC<HomePageProps> = ({ onPlayVideo, onSelectMember }) => {
  return (
    <main>
      <CoverSection />
      <div className="layer">
        <IntroSection />
        <ChaptersSection />
        <WheelSection />
        <FilmesSection onPlay={onPlayVideo} />
        <VideoSection />
        <NovelasSection onPlay={onPlayVideo} />
        <FestivalSection onPlay={onPlayVideo} />
        <TeamSection onSelectMember={onSelectMember} />
        <StepsSection />
        <TestimonialsSection />
        <FaqSection />
        <ContactSection />
      </div>
    </main>
  )
}
