import { LinksContext } from '@/contexts/LinksContext'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState, useContext, useEffect } from 'react'

const HeadLayout = ({ children }) => {
  const [title, setTitle] = useState()
  const router = useRouter()

  const { getPage, allPages } = useContext(LinksContext)

  useEffect(() => {
    const pageName = getPage(
      allPages,
      'path',
      '/' + router.asPath.split('/')[1]
    )?.pageName

    setTitle(pageName)
  }, [router])

  return (
    <>
      <Head>
        <title>Vitaliplay {title && `- ${title}`}</title>
      </Head>
      {children}
    </>
  )
}

export default HeadLayout
