import '@/styles/globals.css'
import 'tailwindcss/tailwind.css'
import Layout from '@/components/layouts/Layout'
import { AuthContextProvider } from '@/contexts/AuthContext'
import { RouteContextProvider } from '@/contexts/RouteContext'
import { LinksContextProvider } from '@/contexts/LinksContext'

const MyApp = ({ Component, pageProps }) => {
  return (
    <LinksContextProvider>
      <RouteContextProvider>
        <AuthContextProvider>
          <Layout>
            <PerPageLayout Layout={Component.Layout}>
              <Component {...pageProps} />
            </PerPageLayout>
          </Layout>
        </AuthContextProvider>
      </RouteContextProvider>
    </LinksContextProvider>
  )
}

const PerPageLayout = ({ children, Layout }) => {
  if (Layout) return <Layout>{children}</Layout>
  else return <>{children}</>
}

export default MyApp
