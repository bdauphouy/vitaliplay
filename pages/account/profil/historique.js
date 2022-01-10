import Image from 'next/image'
import Row from '@/components/pages/account/Row'
import Card from '@/components/pages/account/Card'
import Title from '@/components/utils/Title'

const ProfileHistory = () => {
  return (
    <div className="mt-20 py-10 lg:py-20">
      <Title type="1" center={true}>
        Historique
      </Title>
      <div className="mt-12 lg:mt-20 space-y-12 lg:space-y-16">
        <Row title="Août 2021" button={false} mobile={true}>
          <Card
            tagType="1"
            title="Exercices intensifs pour le bas du corps"
            type="séances"
            duration="27"
            level="Intermédiaire"
            bg="/bg-card.png"
            mobile={true}
          />
          <Card
            tagType="2"
            title="Exercices intensifs pour le bas du corps"
            type="séances"
            duration="27"
            level="Intermédiaire"
            bg="/bg-card.png"
            mobile={true}
          />
          <Card
            tagType="3"
            title="Exercices intensifs pour le bas du corps"
            type="séances"
            duration="27"
            level="Intermédiaire"
            bg="/bg-card.png"
            mobile={true}
          />
          <Card
            tagType="4"
            title="Exercices intensifs pour le bas du corps"
            type="séances"
            duration="27"
            level="Intermédiaire"
            bg="/bg-card.png"
            mobile={true}
          />
        </Row>
        <Row title="Juillet 2021" button={false} mobile={true}>
          <Card
            tagType="1"
            title="Exercices intensifs pour le bas du corps"
            type="séances"
            duration="27"
            level="Intermédiaire"
            bg="/bg-card.png"
            mobile={true}
          />
          <Card
            tagType="2"
            title="Exercices intensifs pour le bas du corps"
            type="séances"
            duration="27"
            level="Intermédiaire"
            bg="/bg-card.png"
            mobile={true}
          />
          <Card
            tagType="3"
            title="Exercices intensifs pour le bas du corps"
            type="séances"
            duration="27"
            level="Intermédiaire"
            bg="/bg-card.png"
            mobile={true}
          />
          <Card
            tagType="4"
            title="Exercices intensifs pour le bas du corps"
            type="séances"
            duration="27"
            level="Intermédiaire"
            bg="/bg-card.png"
            mobile={true}
          />
          <Card
            tagType="3"
            title="Exercices intensifs pour le bas du corps"
            type="séances"
            duration="27"
            level="Intermédiaire"
            bg="/bg-card.png"
            mobile={true}
          />
          <Card
            tagType="4"
            title="Exercices intensifs pour le bas du corps"
            type="séances"
            duration="27"
            level="Intermédiaire"
            bg="/bg-card.png"
            mobile={true}
          />
        </Row>
      </div>
    </div>
  )
}

export default ProfileHistory
