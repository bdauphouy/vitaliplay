import Cta from '@/components/utils/Cta'
import Title from '@/components/utils/Title'
import Subtitle from '@/components/utils/Subtitle'

const OnLive = () => {
  return (
    <div className="mt-20 py-10 md:py-20 px-6 md:px-24 ">
      <div className="flex gap-10 xl:justify-between items-center xl:gap-24 xl:flex-row flex-col-reverse">
        <div className="xl:max-w-xl">
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
          className="xl:flex-[.8] w-full xl:w-auto xl:min-w-[500px] bg-cover h-36 lg:h-32 rounded-lg flex items-center md:items-end p-4">
          <div className="flex justify-between items-start md:items-center flex-1 md:flex-row flex-col">
            <div>
              <h3 className="font-head font-bold text-light-100 text-lg leading-6">
                Live Yoga : Sophie Martinez
              </h3>
              <span className="mt-2 text-sm text-light-100">16:00 - 17:00</span>
            </div>
            <div className="md:mt-0 mt-6">
              <Cta size="m">Mettre un rappel</Cta>
            </div>
          </div>
        </div>
      </div>
      <iframe
        className="mt-12 w-full aspect-video"
        src="https://www.youtube.com/embed/yR9Wpyf8gbk"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen></iframe>
    </div>
  )
}

export default OnLive
