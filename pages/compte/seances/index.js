import Image from 'next/image'
import Card from '@/components/pages/account/Card'
import Row from '@/components/pages/account/Row'
import Link from 'next/link'
import { useRouter } from 'next/router'
import AccountLayout from '@/components/layouts/AccountLayout'

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
        <Row
          title="Toutes les séances"
          path={`${router.asPath}/toutes-les-seances`}
        >
          {[...Array(4)].map((item, i) => {
            return (
              <Link
                key={i}
                href={`${router.asPath}/toutes-les-seances/1`}
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
            )
          })}
        </Row>
      </div>
    </div>
  )
}

Sessions.Layout = AccountLayout

export default Sessions
