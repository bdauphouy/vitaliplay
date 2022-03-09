import { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import { LinksContext } from '@/contexts/LinksContext'

const SurveyLayout = ({ children }) => {
  const { getPage, surveyPages } = useContext(LinksContext)

  const [achievedSteps, setAchievedSteps] = useState([])
  const [currentPath, setCurrentPath] = useState()
  const [hiddenPages] = useState(['Questionnaire', 'Succès'])
  const router = useRouter()

  useEffect(() => {
    if (!window.localStorage.getItem('vitaliplay.survey.store')) {
      window.localStorage.setItem('vitaliplay.survey.store', JSON.stringify({}))
    }
  }, [])

  useEffect(() => {
    setCurrentPath(router.asPath)
  }, [router])

  useEffect(() => {
    setAchievedSteps(
      Array.from(Array(getPage(surveyPages, 'path', currentPath)?.id).keys())
    )
    refreshLocalStorage(getPage(surveyPages, 'path', currentPath)?.id)
  }, [currentPath])

  const refreshLocalStorage = (id) => {
    window.localStorage.setItem(
      'vitaliplay.survey.activeStep',
      (id && id.toString()) || '1'
    )
  }

  const switchSurveyStep = (surveyId) => {
    refreshLocalStorage(surveyId)
    router.push(getPage(surveyPages, 'id', surveyId).path)
  }

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      <aside
        style={{ minWidth: '400px' }}
        className="z-20 hidden min-h-screen bg-light-100 shadow-level1 lg:flex"
      >
        <nav className="mt-40">
          <ul className="flex flex-col gap-8 pl-24">
            {surveyPages.map((surveyPage) => {
              if (hiddenPages.includes(surveyPage.pageName)) return
              return (
                <li key={surveyPage.id}>
                  <div
                    onClick={() => switchSurveyStep(surveyPage.id)}
                    className="flex cursor-pointer items-center"
                  >
                    <div
                      style={{
                        transitionProperty: 'background-color, color',
                      }}
                      className={`grid h-8 w-8 place-items-center rounded-full font-head font-bold transition ${
                        achievedSteps.includes(surveyPage.id)
                          ? 'bg-blue-900 text-light-100'
                          : currentPath === surveyPage.path
                          ? 'bg-blue-50 text-blue-900'
                          : 'bg-gray-100 text-dark-300'
                      }`}
                    >
                      {surveyPage.id}
                    </div>
                    <span
                      style={{ transitionProperty: 'color' }}
                      className={`ml-4 font-body text-sm font-bold uppercase transition ${
                        currentPath === surveyPage.path
                          ? 'text-blue-900'
                          : achievedSteps.includes(surveyPage.id)
                          ? 'text-blue-300'
                          : 'text-dark-300'
                      }`}
                    >
                      {surveyPage.pageName}
                    </span>
                  </div>
                </li>
              )
            })}
          </ul>
        </nav>
      </aside>
      <nav className="flex h-48 items-end justify-center px-6 pb-16 shadow-level1 md:px-24 lg:hidden">
        <ul className="relative flex md:w-full">
          {surveyPages.map((surveyPage) => {
            if (hiddenPages.includes(surveyPage.pageName)) return
            return (
              <li
                key={surveyPage.id}
                className={`flex items-center ${
                  surveyPage.id < surveyPages.length ? 'md:w-full' : ''
                }`}
              >
                <div className="relative flex flex-col items-center">
                  <div
                    onClick={() => switchSurveyStep(surveyPage.id)}
                    style={{ transitionProperty: 'background-color, color' }}
                    className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded-full font-head font-bold transition ${
                      achievedSteps.includes(surveyPage.id)
                        ? 'bg-blue-900 text-light-100'
                        : currentPath === surveyPage.path
                        ? 'bg-blue-50 text-blue-900'
                        : 'bg-gray-100 text-dark-300'
                    }`}
                  >
                    {surveyPage.id}
                  </div>
                  <span
                    className={`absolute mt-10 w-24 text-center font-body text-sm font-bold uppercase text-blue-900 ${
                      currentPath === surveyPage.path ? 'block' : 'hidden'
                    }`}
                  >
                    {surveyPage.pageName}
                  </span>
                </div>

                {surveyPage.id < surveyPages.length - 2 && (
                  <div
                    style={{ transitionProperty: 'width, background-color' }}
                    className={`separator mx-1 h-0.5 transition ${
                      currentPath === surveyPage.path ||
                      currentPath ===
                        getPage(surveyPages, 'id', surveyPage.id + 1).path
                        ? 'w-2 bg-gray-100 xsm:w-4 md:w-full'
                        : achievedSteps.includes(surveyPage.id)
                        ? 'w-1 bg-blue-900 xsm:w-2 md:w-full'
                        : 'w-1 bg-gray-100 xsm:w-2 md:w-full'
                    }`}
                  ></div>
                )}
              </li>
            )
          })}
        </ul>
      </nav>
      <div className="flex w-full flex-1 px-6 py-10 md:px-24 lg:py-40 xl:mr-24 2xl:mr-40">
        <div className="w-full lg:w-11/12">{children}</div>
      </div>
    </div>
  )
}

export default SurveyLayout
