import Subtitle from '@/components/utils/Subtitle'
import Tag from './Tag'
import Title from '@/components/utils/Title'

const Card = ({
  tagType = '1',
  type = 'catégorie',
  title,
  subtitle,
  duration,
  level,
  bg,
  height = 'h-96',
  mobile = false,
}) => {
  return (
    <>
      <div
        style={{ backgroundImage: `url('${bg}')` }}
        className={`${
          mobile ? 'hidden' : 'flex'
        } ${height} md:flex min-h-[250px] bg-cover bg-center sm:min-w-[288px] min-w-[250px] lg:w-full flex-col items-start justify-between font-body font-bold px-6 py-6 rounded-lg bg-light-100 drop-shadow-level1 overflow-hidden`}>
        {type === 'séances' ? (
          <>
            <Tag type={tagType}>Renforcement</Tag>
            <div>
              <h3 className="font-head font-bold text-lg text-light-100">
                {title}
              </h3>
              <p className="text-dark-50 mt-2 text-sm font-normal">
                {duration} min - {level}
              </p>
            </div>
          </>
        ) : type === 'programme' ? (
          <div className="w-full h-full flex flex-col items-center justify-center p-6">
            <h3 className="font-head font-bold text-lg lg:text-xl text-light-100">
              {title}
            </h3>
            <p className="font-body text-center font-light text-md text-dark-50 mt-2">
              {subtitle}
            </p>
          </div>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-4">
            <h3 className="font-head font-bold text-4xl text-light-100">
              {title}
            </h3>
          </div>
        )}
      </div>
      {mobile && (
        <div className="md:hidden flex items-center gap-4">
          <div
            style={{ backgroundImage: `url('${bg}')` }}
            className="min-w-[72px] min-h-[72px] rounded"></div>
          <div>
            <Title type="9" as="h3">
              Conférences de santé
            </Title>

            <p className="mt-1 text-xs text-dark-500 text-light font-body">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Gravida
              eget varius a diam faucibus nec sodales…
            </p>
          </div>
        </div>
      )}
    </>
  )
}

export default Card
