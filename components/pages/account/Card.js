import Tag from './Tag'

const Card = ({
  tagType = '1',
  type = 'catégorie',
  title,
  subtitle,
  duration,
  level,
  size = 'l',
  bg,
}) => {
  return (
    <div
      style={{ backgroundImage: `url('${bg}')` }}
      className="min-h-[250px] h-full bg-cover bg-center min-w-[288px] lg:w-full flex flex-col items-start justify-between font-body font-bold px-6 py-6 rounded-lg bg-light-100 drop-shadow-level1 overflow-hidden">
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
        <div className="w-full h-full flex flex-col items-center justify-center p-2">
          <h3 className="font-head font-bold text-2xl text-light-100">
            {title}
          </h3>
          <p className="font-body text-center font-normal text-md text- text-dark-50 mt-2">
            {subtitle}
          </p>
        </div>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center p-2">
          <h3 className="font-head font-bold text-4xl text-light-100">
            {title}
          </h3>
        </div>
      )}
    </div>
  )
}

export default Card
