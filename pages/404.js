import ErrorPageLayout from '@/components/layouts/ErrorPageLayout'
import Title from '@/components/utils/Title'
import Subtitle from '@/components/utils/Subtitle'
import Cta from '@/components/utils/Cta'
import { useRouter } from 'next/router'

const PageNotFound = () => {
  const router = useRouter()

  return (
    <div className="mt-20 flex h-[calc(100vh-165px)] items-center justify-center px-6 md:px-24">
      <div className="mx-auto max-w-4xl gap-16 lg:flex">
        <Title type="1">
          La page que vous essayez d'atteindre n'existe pas.
        </Title>
        <div className="mt-6 lg:mt-0">
          <Subtitle>
            Mais ce n'est pas grave, retournez sur la page d'accueil, nous avons
            tout ce qu'il faut pour vous.
          </Subtitle>
          <div className="mt-6" onClick={() => router.push('/')}>
            <Cta size="l">Retour à l'accueil</Cta>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PageNotFound

PageNotFound.Layout = ErrorPageLayout
