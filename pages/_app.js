import '@/styles/globals.css'
import 'tailwindcss/tailwind.css'
import Layout from '@/components/layouts/Layout'
import { AuthContextProvider } from '@/contexts/AuthContext'
import { RouteContextProvider } from '@/contexts/RouteContext'
import { LinksContextProvider } from '@/contexts/LinksContext'
import { SurveyContextProvider } from '@/contexts/SurveyContext'
import { CheckupContextProvider } from '@/contexts/CheckupContext'

const MyApp = ({ Component, pageProps }) => {
  return (
    <CheckupContextProvider>
      <SurveyContextProvider>
        <AuthContextProvider>
          <RouteContextProvider>
            <LinksContextProvider>
              <Layout>
                <PerPageLayout Layout={Component.Layout}>
                  <Component {...pageProps} />
                </PerPageLayout>
              </Layout>
            </LinksContextProvider>
          </RouteContextProvider>
        </AuthContextProvider>
      </SurveyContextProvider>
    </CheckupContextProvider>
  )
}

const PerPageLayout = ({ children, Layout }) => {
  if (Layout) return <Layout>{children}</Layout>
  else return <>{children}</>
}

export default MyApp
