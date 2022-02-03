import Image from 'next/image'
import Card from '@/components/pages/account/Card'
import Row from '@/components/pages/account/Row'
import Link from 'next/link'
import { useRouter } from 'next/router'

const Sessions = () => {
  const router = useRouter()

  return (
    <div className="mt-20">
      <header className="relative h-60 lg:h-96">
        <Image
          src="/session-header.png"
          alt="sessions-header"
          layout="fill"
          placeholder="blur"
          blurDataURL="/session-header.png"
          objectFit="cover"
        />
      </header>
      <div className="flex flex-col gap-12 py-12">
        <Row title="Toutes les séances" path="/toutes-les-seances">
          <Link
            href={`${router.route
              .split('/')
              .slice(2)
              .join('/')}/toutes-les-seances/1`}
            passHref
          >
            <a>
              <Card
                tagType="1"
                title="Exercices intensifs pour le bas du corps"
                type="séances"
                duration="27"
                level="Intermédiaire"
                bg="/bg-card.png"
              />
            </a>
          </Link>
          <Link
            href={`/${router.route
              .split('/')
              .slice(2)
              .join('/')}/toutes-les-seances/1`}
            passHref
          >
            <a>
              <Card
                tagType="1"
                title="Exercices intensifs pour le bas du corps"
                type="séances"
                duration="27"
                level="Intermédiaire"
                bg="/bg-card.png"
              />
            </a>
          </Link>
          <Link
            href={`/${router.route
              .split('/')
              .slice(2)
              .join('/')}/toutes-les-seances/1`}
            passHref
          >
            <a>
              <Card
                tagType="1"
                title="Exercices intensifs pour le bas du corps"
                type="séances"
                duration="27"
                level="Intermédiaire"
                bg="/bg-card.png"
              />
            </a>
          </Link>
          <Link
            href={`/${router.route
              .split('/')
              .slice(2)
              .join('/')}/toutes-les-seances/1`}
            passHref
          >
            <a>
              <Card
                tagType="1"
                title="Exercices intensifs pour le bas du corps"
                type="séances"
                duration="27"
                level="Intermédiaire"
                bg="/bg-card.png"
              />
            </a>
          </Link>
        </Row>
        <Row title="Sélectionnés pour vous" path="/toutes-les-seances">
          <Link
            href={`/${router.route
              .split('/')
              .slice(2)
              .join('/')}/toutes-les-seances/1`}
            passHref
          >
            <a>
              <Card
                tagType="1"
                title="Exercices intensifs pour le bas du corps"
                type="séances"
                duration="27"
                level="Intermédiaire"
                bg="/bg-card.png"
              />
            </a>
          </Link>
          <Link
            href={`/${router.route
              .split('/')
              .slice(2)
              .join('/')}/toutes-les-seances/1`}
            passHref
          >
            <a>
              <Card
                tagType="1"
                title="Exercices intensifs pour le bas du corps"
                type="séances"
                duration="27"
                level="Intermédiaire"
                bg="/bg-card.png"
              />
            </a>
          </Link>
          <Link
            href={`/${router.route
              .split('/')
              .slice(2)
              .join('/')}/toutes-les-seances/1`}
            passHref
          >
            <a>
              <Card
                tagType="1"
                title="Exercices intensifs pour le bas du corps"
                type="séances"
                duration="27"
                level="Intermédiaire"
                bg="/bg-card.png"
              />
            </a>
          </Link>
          <Link
            href={`/${router.route
              .split('/')
              .slice(2)
              .join('/')}/toutes-les-seances/1`}
            passHref
          >
            <a>
              <Card
                tagType="1"
                title="Exercices intensifs pour le bas du corps"
                type="séances"
                duration="27"
                level="Intermédiaire"
                bg="/bg-card.png"
              />
            </a>
          </Link>
        </Row>
        <Row title="Disciplines" path="/toutes-les-seances">
          <Link
            href={`/${router.route
              .split('/')
              .slice(2)
              .join('/')}/toutes-les-seances/1`}
            passHref
          >
            <a>
              <Card title="Yoga" type="catégorie" bg="/bg-card.png" />
            </a>
          </Link>
          <Link
            href={`/${router.route
              .split('/')
              .slice(2)
              .join('/')}/toutes-les-seances/1`}
            passHref
          >
            <a>
              <Card title="Fitness" type="catégorie" bg="/bg-card.png" />
            </a>
          </Link>
          <Link
            href={`/${router.route
              .split('/')
              .slice(2)
              .join('/')}/toutes-les-seances/1`}
            passHref
          >
            <a>
              <Card title="Workout" type="catégorie" bg="/bg-card.png" />
            </a>
          </Link>
          <Link
            href={`/${router.route
              .split('/')
              .slice(2)
              .join('/')}/toutes-les-seances/1`}
            passHref
          >
            <a>
              <Card title="Running" type="catégorie" bg="/bg-card.png" />
            </a>
          </Link>
        </Row>
        <Row title="Programmes" path="/toutes-les-seances">
          <Link
            href={`/${router.route
              .split('/')
              .slice(2)
              .join('/')}/toutes-les-seances/1`}
            passHref
          >
            <a>
              <Card
                title="Programme 1"
                subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                type="programme"
                bg="/bg-card.png"
              />
            </a>
          </Link>
          <Link
            href={`/${router.route
              .split('/')
              .slice(2)
              .join('/')}/toutes-les-seances/1`}
            passHref
          >
            <a>
              <Card
                title="Programme 1"
                subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                type="programme"
                bg="/bg-card.png"
              />
            </a>
          </Link>
          <Link
            href={`/${router.route
              .split('/')
              .slice(2)
              .join('/')}/toutes-les-seances/1`}
            passHref
          >
            <a>
              <Card
                title="Programme 1"
                subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                type="programme"
                bg="/bg-card.png"
              />
            </a>
          </Link>
          <Link
            href={`/${router.route
              .split('/')
              .slice(2)
              .join('/')}/toutes-les-seances/1`}
            passHref
          >
            <a>
              <Card
                title="Programme 1"
                subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                type="programme"
                bg="/bg-card.png"
              />
            </a>
          </Link>
        </Row>
      </div>
    </div>
  )
}

export default Sessions
