import showdown from 'showdown'
import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

const Title = ({
  children = 'This is a title',
  type = '2',
  center = false,
  html = true,
  color = 'text-dark-900',
  as = 'h2',
}) => {
  const TitleTag = as || 'h2'

  const [converter, setConverter] = useState()

  useEffect(() => {
    setConverter(new showdown.Converter())
  }, [])

  return html ? (
    <TitleTag
      className={`font-head font-bold
  ${
    type === '1'
      ? 'text-3xl md:text-5xl lg:font-extrabold'
      : type === '2'
      ? 'text-2xl md:text-4xl'
      : type === '3'
      ? 'text-3xl'
      : type === '4'
      ? 'text-xl md:text-3xl'
      : type === '5'
      ? 'text-[1.25rem] md:text-xl'
      : 'text-base'
  } ${center && 'text-center'} ${color}`}
      dangerouslySetInnerHTML={{
        __html:
          type === '2' && typeof children === 'string'
            ? converter
                ?.makeHtml(children)
                .split('<strong>')
                .join('<strong class="type-2">')
            : converter?.makeHtml(children),
      }}></TitleTag>
  ) : (
    <TitleTag
      className={`font-head font-bold
    ${
      type === '1'
        ? 'text-3xl md:text-5xl lg:font-extrabold'
        : type === '2'
        ? 'text-2xl md:text-4xl'
        : type === '3'
        ? 'text-3xl'
        : type === '4'
        ? 'text-xl md:text-3xl'
        : type === '5'
        ? 'text-[1.25rem] md:text-xl'
        : 'text-base'
    } ${center && 'text-center'} ${color}`}>
      {children}
    </TitleTag>
  )
}

Title.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  color: PropTypes.string,
  center: PropTypes.bool,
  type: PropTypes.oneOf(['1', '2', '3', '4', '5']),
  html: PropTypes.bool,
  as: PropTypes.oneOf(['h2', 'h3', 'h4', 'h5', 'h6']),
}

export default Title
