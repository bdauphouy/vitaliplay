import showdown from 'showdown'
import { useEffect, useState } from 'react'

const Subtitle = ({
  children = 'This is a subtitle',
  color = 'text-dark-500',
  center = false,
  type = '1',
  html = true,
}) => {
  const [converter, setConverter] = useState()

  useEffect(() => {
    setConverter(new showdown.Converter())
  }, [])

  return html ? (
    <p
      dangerouslySetInnerHTML={{
        __html: converter?.makeHtml(children.replaceAll('\n', '<br>')),
      }}
      className={`font-body ${color} leading-8 ${
        type === '1'
          ? 'md:text-lg'
          : type === '3'
          ? 'text-md md:text-lg'
          : type === '4'
          ? 'text-md lg:text-base'
          : 'text-base'
      } md:leading-8 ${center && 'text-center'}`}
    ></p>
  ) : (
    <p
      className={`font-body ${color} leading-8 ${
        type === '1'
          ? 'md:text-lg'
          : type === '3'
          ? 'text-md md:text-lg'
          : type === '4'
          ? 'text-md lg:text-base'
          : 'text-base'
      } md:leading-8 ${center && 'text-center'}`}
    >
      {children}
    </p>
  )
}

export default Subtitle
