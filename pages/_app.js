import '@/styles/globals.css'
import 'tailwindcss/tailwind.css'
import Layout from '@/components/layouts/Layout'
import { AuthContextProvider } from '@/contexts/AuthContext'
import { RouteContextProvider } from '@/contexts/RouteContext'
import { LinksContextProvider } from '@/contexts/LinksContext'
import { CustomContextProvider } from '@/contexts/CustomContext'

const MyApp = ({ Component, pageProps }) => {
  return (
    <CustomContextProvider>
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
    </CustomContextProvider>
  )
}

const PerPageLayout = ({ children, Layout }) => {
  if (Layout) return <Layout>{children}</Layout>
  else return <>{children}</>
}

export default MyApp
