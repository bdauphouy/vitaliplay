import '../styles/globals.css'
import 'tailwindcss/tailwind.css'
import Layout from '../components/Layout'
import { AuthContextProvider } from '../contexts/AuthContext'
import { RouteContextProvider } from '../contexts/RouteContext'
import { LinksContextProvider } from '../contexts/LinksContext'
import { createContext } from 'react'

export const HomeContext = createContext()

const MyApp = ({ Component, pageProps }) => {
  return (
    <LinksContextProvider>
      <RouteContextProvider>
        <AuthContextProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AuthContextProvider>
      </RouteContextProvider>
    </LinksContextProvider>
  )
}

export default MyApp
