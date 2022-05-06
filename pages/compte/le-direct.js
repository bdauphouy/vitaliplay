import Cta from '@/components/utils/Cta'
import Title from '@/components/utils/Title'
import Subtitle from '@/components/utils/Subtitle'
import AccountLayout from '@/components/layouts/AccountLayout'
import { fetchAPIWithToken, getToken } from '@/lib/api'
import moment from 'moment'

export const getServerSideProps = async ({ req }) => {
  const lives = await fetchAPIWithToken('/lives', req.cookies.jwt, false)

  return { props: { lives: lives.data } }
}

const TheLive = ({ lives }) => {
  return (
    <div>
      {lives.current ? (
        <div className="mt-20 py-10 px-6 md:py-20 md:px-24">
          <div className="flex flex-col-reverse xl:flex-row xl:items-center xl:justify-between">
            <div className="mt-10 xl:mt-0 xl:mr-24 xl:max-w-xl">
              <Title type="1" html={false}>
                Live : {lives.current.attributes.attributes.name}
              </Title>
              <div className="mt-4">
                <Subtitle>
                  {lives.current.attributes.attributes.description}
                </Subtitle>
              </div>
            </div>
            {lives.current ? (
              <div
                style={{ backgroundImage: "url('/bg-card.png')" }}
                className="flex h-36 w-full items-center rounded-lg bg-cover p-4 md:items-end lg:h-32 xl:w-auto xl:min-w-[500px] xl:flex-[.8]"
              >
                <div className="flex flex-1 flex-col items-start justify-between md:flex-row md:items-center">
                  <div>
                    <h3 className="font-head text-lg font-bold leading-6 text-light-100">
                      {lives.current.attributes.attributes.name}
                    </h3>
                    <span className="mt-2 text-sm text-light-100">
                      {moment(
                        lives.current.attributes.attributes.startTime
                      ).format('HH:mm')}{' '}
                      -{' '}
                      {moment(
                        lives.current.attributes.attributes.endTime
                      ).format('HH:mm')}
                    </span>
                  </div>
                  <div className="mt-6 md:mt-0">
                    <Cta size="m">Mettre un rappel</Cta>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
          <iframe
            className="mt-12 aspect-video w-full bg-dark-900"
            src={lives.current?.attributes.attributes.link}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      ) : (
        <div className="mt-20 py-10 px-6 md:py-20 md:px-24">
          <Subtitle>Aucun live n'est actuellement en cours.</Subtitle>
        </div>
      )}
    </div>
  )
}

TheLive.Layout = AccountLayout

export default TheLive
