import Tag from './Tag'
import PropTypes from 'prop-types'

const Card = ({
  tagType = '1',
  type = 'catégorie',
  title = 'This is a card',
  subtitle = 'Lorem ipsum ut dolor',
  duration = '5',
  level = 'Intermédiaire',
  bg = 'http://vitaliplay.eltha.fr/bg-card.png',
  height = 'md:h-96',
  mobile = false,
}) => {
  return (
    <>
      <div
        style={{ backgroundImage: `url('${bg}')` }}
        className={`${
          mobile ? 'hidden' : 'flex'
        } h-full min-h-[304px] ${height} h-[304px] md:min-w-[288px] min-w-[224px] md:flex bg-cover bg-center lg:w-full flex-col items-start justify-center font-body font-bold rounded-lg bg-light-100 drop-shadow-level1 overflow-hidden`}>
        {type === 'séances' ? (
          <div className="p-4 md:p-6 h-full flex flex-col items-start justify-between">
            <Tag type={tagType}>Renforcement</Tag>
            <div>
              <h3 className="font-head font-bold text-lg text-light-100">
                {title}
              </h3>
              <p className="text-dark-50 mt-2 text-sm font-normal">
                {duration} min - {level}
              </p>
            </div>
          </div>
        ) : type === 'programme' ? (
          <div className="p-3 md:p-6 w-full h-full flex flex-col items-center justify-center">
            <h3 className="font-head font-bold text-lg lg:text-xl text-light-100">
              {title}
            </h3>
            <p className="font-body text-center font-light text-md text-dark-50 mt-2">
              {subtitle}
            </p>
          </div>
        ) : (
          <div className="p-4 md:p-6 w-full h-full flex flex-col text-center items-center justify-center">
            <h3 className="font-head font-bold text-2xl md:text-4xl text-light-100">
              {title}
            </h3>
          </div>
        )}
      </div>
      {mobile && (
        <div className="md:hidden flex items-center gap-4">
          <div
            style={{ backgroundImage: `url('${bg}')` }}
            className="min-w-[4.5rem] min-h-[4.5rem] rounded"></div>
          <div>
            <h3 className="font-bold font-head text-dark-900 text-md">
              Conférences de santé
            </h3>
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

Card.propTypes = {
  tagType: PropTypes.oneOf(['1', '2', '3', '4']),
  type: PropTypes.oneOf(['catégorie', 'séances', 'programme']),
  title: PropTypes.string,
  subtitle: PropTypes.string,
  duration: PropTypes.string,
  level: PropTypes.string,
  bg: PropTypes.string,
  height: PropTypes.string,
  mobile: PropTypes.bool,
}

export default Card
