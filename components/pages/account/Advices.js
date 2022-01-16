import Title from '@/components/utils/Title'
import Subtitle from '@/components/utils/Subtitle'
import Cta from '@/components/utils/Cta'

const Advices = ({ button }) => {
  return (
    <div className="rounded-lg overflow-hidden shadow-level1 mt-6 xl:flex">
      <div className="bg-blue-50 flex xl:flex-col xl:py-4 items-center justify-between xl:justify-start p-6 min-w-[12rem]">
        <h4 className="font-body font-normal text-base lg:text-lg text-dark-700">
          Note du bilan
        </h4>
        <h2 className="font-extrabold font-head leading-[5rem] text-[4rem] xl:text-[5rem] xl:mt-8 text-blue-900">
          66
        </h2>
      </div>
      <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between px-4 py-6 xl:py-10 xl:px-12">
        <div className="2xl:flex-[2] xl:flex-[1.5] xl:pr-16">
          <h3 className="font-head font-bold text-[1.25rem] lg:text-2xl text-dark-900">
            Nos Conseils
          </h3>
          <div className="mt-3 mb-6 xl:mb-0 xl:mt-5">
            <Subtitle type="3">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. At purus
              pellentesque malesuada pellentesque ultricies leo sit. Ut in sed
              ultricies diam arcu et. Sed lectus feugiat aliquam urna, sed risus
              sed.
            </Subtitle>
          </div>
        </div>
        {button && (
          <div className="xl:flex-1 xl:flex xl:justify-end">
            <Cta arrow="right" size="l">
              Accéder aux conseils
            </Cta>
          </div>
        )}
      </div>
    </div>
  )
}

export default Advices
