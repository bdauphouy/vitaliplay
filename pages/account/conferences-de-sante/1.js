import Title from '@/components/utils/Title'
import Image from 'next/image'
import Cta from '@/components/utils/Cta'
import { useState, useEffect } from 'react'
import { useMediaQuery } from '@mui/material'
import Card from '@/components/pages/account/Card'
import DropDown from '@/components/utils/Dropdown'
import Row from '@/components/pages/account/Row'
import { useRouter } from 'next/router'
import Subtitle from '@/components/utils/Subtitle'
import Link from 'next/link'

const HealthConferences1 = () => {
  const router = useRouter()

  const isMediumScreen = useMediaQuery('(min-width: 768px)')

  return (
    <div className="mt-20 py-5 pb-10 md:py-16 min-h-[calc(100vh_-_165px)]">
      <div className="px-6 md:px-24" onClick={() => router.back()}>
        <Cta arrow="left" type="secondary" size={isMediumScreen ? 'l' : 'm'}>
          Retour
        </Cta>
      </div>
      <div className="px-6 md:px-24">
        <div className="mt-6 max-w-3xl flex flex-col gap-3 lg:gap-4">
          <Title type="1">Exercices intensifs pour le bas du corps</Title>
          <Subtitle type="3">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Gravida
            eget varius a diam faucibus nec sodales fermentum eget.
          </Subtitle>
        </div>
        <iframe
          className="mt-8 lg:mt-12 w-full aspect-video"
          src="https://www.youtube.com/embed/yR9Wpyf8gbk"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen></iframe>
      </div>

      <div className="mt-10 lg:mt-20">
        <Row title="Conférences en lien" button={false}>
          <Card
            tagType="1"
            title="Exercices intensifs pour le bas du corps"
            type="séances"
            duration="27"
            level="Intermédiaire"
            bg="/bg-card.png"
          />

          <Card
            tagType="1"
            title="Exercices intensifs pour le bas du corps"
            type="séances"
            duration="27"
            level="Intermédiaire"
            bg="/bg-card.png"
          />
          <Card
            tagType="1"
            title="Exercices intensifs pour le bas du corps"
            type="séances"
            duration="27"
            level="Intermédiaire"
            bg="/bg-card.png"
          />
          <Card
            tagType="1"
            title="Exercices intensifs pour le bas du corps"
            type="séances"
            duration="27"
            level="Intermédiaire"
            bg="/bg-card.png"
          />
        </Row>
      </div>
    </div>
  )
}

export default HealthConferences1
