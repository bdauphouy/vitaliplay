import Title from '@/components/utils/Title'
import Image from 'next/image'
import Cta from '@/components/utils/Cta'
import { useState, useEffect } from 'react'
import { useMediaQuery } from '@mui/material'
import Card from '@/components/pages/account/Card'
import DropDown from '@/components/utils/Dropdown'
import Row from '@/components/pages/account/Row'

const Sessions = () => {
  return (
    <div className="mt-20">
      <header className="h-60 lg:h-96 relative">
        <Image
          src="/session-header.png"
          alt="sessions-header"
          layout="fill"
          placeholder="blur"
          blurDataURL="/session-header.png"
          objectFit="cover"
        />
      </header>
      <div className="flex flex-col py-12 gap-12">
        <Row
          type="checkup"
          title="Nouveaux entraînements"
          path="/nouveaux-entrainements">
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
        <Row type="checkup" title="Sélectionnés pour vous">
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
        <Row type="checkup" title="Disciplines">
          <Card title="Yoga" type="catégorie" bg="/bg-card.png" />
          <Card title="Fitness" type="catégorie" bg="/bg-card.png" />
          <Card title="Workout" type="catégorie" bg="/bg-card.png" />
          <Card title="Running" type="catégorie" bg="/bg-card.png" />
        </Row>
        <Row type="checkup" title="Programmes">
          <Card
            title="Programme 1"
            subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            type="programme"
            bg="/bg-card.png"
          />
          <Card
            title="Programme 1"
            subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            type="programme"
            bg="/bg-card.png"
          />
          <Card
            title="Programme 1"
            subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            type="programme"
            bg="/bg-card.png"
          />
          <Card
            title="Programme 1"
            subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            type="programme"
            bg="/bg-card.png"
          />
        </Row>
      </div>
    </div>
  )
}

export default Sessions
