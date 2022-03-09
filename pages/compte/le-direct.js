import Cta from '@/components/utils/Cta'
import Title from '@/components/utils/Title'
import Subtitle from '@/components/utils/Subtitle'
import AccountLayout from '@/components/layouts/AccountLayout'

const TheLive = () => {
  return (
    <div className="mt-20 py-10 px-6 md:py-20 md:px-24 ">
      <div className="flex flex-col-reverse items-center xl:flex-row xl:justify-between">
        <div className="mt-10 xl:mt-0 xl:mr-24 xl:max-w-xl">
          <Title type="1">Live : Remise en forme</Title>
          <div className="mt-4">
            <Subtitle>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Gravida
              eget varius a diam faucibus nec sodales fermentum eget.
            </Subtitle>
          </div>
        </div>
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
        </div>
      </div>
      <iframe
        className="mt-12 aspect-video w-full"
        src="https://www.youtube.com/embed/yR9Wpyf8gbk"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  )
}

TheLive.Layout = AccountLayout

export default TheLive
