import Cta from '@/components/utils/Cta'
import Title from '@/components/utils/Title'
import { useEffect, useState } from 'react'
import Subtitle from '@/components/utils/Subtitle'
import AccountLayout from '@/components/layouts/AccountLayout'
import { fetchAPIWithToken, getToken } from '@/lib/api'

export const getStaticProps = async () => {
    const theLive = await fetchAPIWithToken('/lives')
    return { props: { theLive } }
  }

const TheLive = () => {
    const [lives,setLives] = useState({})
    useEffect(()=>{
        async function fetchApi(){
            const token = getToken()
            const dataLives = await fetchAPIWithToken('/lives', token)

            setLives( dataLives)
        }
        fetchApi()
    },[])

    
    const newLive = false
  return (
      <div>
          { lives?.data ? 
          <div className="mt-20 py-10 px-6 md:py-20 md:px-24 ">
            <div className="flex flex-col-reverse items-center xl:flex-row xl:justify-between">
              <div className="mt-10 xl:mt-0 xl:mr-24 xl:max-w-xl">
                <Title type="1">Live : {lives?.data?.inTheAir?.attributes?.name || ""}</Title>
                <div className="mt-4">
                  <Subtitle>
                  {lives?.data?.inTheAir?.attributes?.description || ""}
                  </Subtitle>
                </div>
              </div>
              {newLive ?
              null:
              <div
                style={{ backgroundImage: "url('/bg-card.png')" }}
                className="flex h-36 w-full items-center rounded-lg bg-cover p-4 md:items-end lg:h-32 xl:w-auto xl:min-w-[500px] xl:flex-[.8]"
              >
                <div className="flex flex-1 flex-col items-start justify-between md:flex-row md:items-center">
                  <div>
                    <h3 className="font-head text-lg font-bold leading-6 text-light-100">
                      Live Yoga : Sophie Martinez
                    </h3>
                    <span className="mt-2 text-sm text-light-100">16:00 - 17:00</span>
                  </div>
                  <div className="mt-6 md:mt-0">
                    <Cta size="m">Mettre un rappel</Cta>
                  </div>
                </div>
              </div>}
            </div>
            <iframe
              className="mt-12 aspect-video w-full"
              src={lives?.data?.inTheAir?.attributes?.link || ""}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          :null}
      </div>
  )
}

TheLive.Layout = AccountLayout

export default TheLive
