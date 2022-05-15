import Tag from './Tag'

const Card = ({
  tag,
  type = 'catégorie',
  title = 'This is a card',
  subtitle = 'Lorem ipsum ut dolor',
  duration = '5',
  level = 'Intermédiaire',
  bg = 'http://vitaliplay.eltha.fr/bg-card.png',
  height = 'h-full md:h-96',
  mobile = false,
}) => {
  return (
    <>
      <div
        style={{ backgroundImage: `url('${bg}')` }}
        className={`${
          mobile ? 'hidden' : 'flex'
        } cursor-pointer transition-[filter] duration-300 hover:brightness-75 ${height} drop-shadow-level1 min-w-[224px] flex-col items-start justify-center overflow-hidden rounded-lg bg-light-100 bg-cover bg-center font-body font-bold md:flex md:min-w-[288px] lg:w-full xl:min-w-[224px] 2xl:min-w-[288px]`}
      >
        {type === 'séances' ? (
          <div className="flex h-full w-full flex-col items-start justify-between bg-gradient-to-t from-dark-900 via-transparent to-transparent p-4 md:p-6">
            <Tag tag={tag.attributes} />
            <div>
              <h3 className="font-head text-lg font-bold text-light-100">
                {title}
              </h3>
              <p className="mt-2 text-sm font-normal text-dark-50">
                {duration} min - {level}
              </p>
            </div>
          </div>
        ) : type === 'programme' ? (
          <div className="flex h-full w-full flex-col items-center justify-center p-3 md:p-6">
            <h3 className="font-head text-lg font-bold text-light-100 lg:text-xl">
              {title}
            </h3>
            <p className="mt-2 text-center font-body text-md font-normal text-dark-50">
              {subtitle}
            </p>
          </div>
        ) : type === 'conférence' ? (
          <div className="gradien flex h-full w-full flex-col justify-end bg-gradient-to-t from-dark-900 via-transparent to-transparent p-3 md:p-6">
            <h3 className="font-head text-lg font-bold text-light-100 lg:text-xl">
              {title}
            </h3>
            <p className="mt-1 font-body text-xs font-normal text-dark-500 sm:text-sm sm:text-dark-50">
              {subtitle}
            </p>
          </div>
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center p-4 text-center md:p-6">
            <h3 className="font-head text-2xl font-bold text-light-100 md:text-4xl">
              {title}
            </h3>
          </div>
        )}
      </div>
      {mobile && (
        <div className="flex items-center gap-4 md:hidden">
          <div
            style={{ backgroundImage: `url('${bg}')` }}
            className="min-h-[4.5rem] min-w-[4.5rem] rounded"
          ></div>
          <div>
            <h3 className="font-head text-md font-bold text-dark-900">
              Conférences de santé
            </h3>
            <p className="text-light mt-1 font-body text-xs text-dark-500">
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
