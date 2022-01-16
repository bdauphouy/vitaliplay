import showdown from 'showdown'
import { useEffect, useState } from 'react'

const Title = ({
  children,
  type = '2',
  center = false,
  html = true,
  color = 'text-dark-900',
  as = 'h2',
}) => {
  const TitleTag = as

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
      className={`${
        type === '10' ? 'font-body font-normal' : 'font-head font-bold'
      } ${
        type === '1'
          ? 'text-3xl md:text-5xl lg:font-extrabold'
          : type === '3'
          ? 'text-3xl'
          : type === '4'
          ? 'text-xl md:text-3xl'
          : type === '5'
          ? 'text-[1.25rem] md:text-xl'
          : type === '6'
          ? 'text-[1.25rem]'
          : type === '7'
          ? 'text-lg'
          : type === '8'
          ? 'text-xl md:text-3xl lg:text-4xl'
          : type === '9'
          ? 'text-md'
          : type === '10'
          ? 'text-base lg:text-lg'
          : type === '11'
          ? 'text-[1.25rem] lg:text-2xl'
          : type === '12'
          ? 'text-lg lg:text-xl'
          : 'text-2xl md:text-4xl'
      } ${center && 'text-center'} ${color}`}>
      {children}
    </TitleTag>
  )
}

export default Title
