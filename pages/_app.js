import '@/styles/globals.css'
import 'tailwindcss/tailwind.css'
import { AuthContextProvider } from '@/contexts/AuthContext'
import { RouteContextProvider } from '@/contexts/RouteContext'
import { LinksContextProvider } from '@/contexts/LinksContext'

const MyApp = ({ Component, pageProps }) => {
  return (
    <AuthContextProvider>
      <RouteContextProvider>
        <LinksContextProvider>
          <PerPageLayout Layout={Component.Layout}>
            <Component {...pageProps} />
          </PerPageLayout>
        </LinksContextProvider>
      </RouteContextProvider>
    </AuthContextProvider>
  )
}

const PerPageLayout = ({ children, Layout }) => {
  if (Layout) return <Layout>{children}</Layout>
  else return <>{children}</>
}

export default MyApp
