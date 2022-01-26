import { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import { SurveyContext } from '@/contexts/SurveyContext'

const SurveyLayout = ({ children }) => {
  const { prefix, getPathById, getIdByPath, surveySteps } =
    useContext(SurveyContext)

  const [achievedSteps, setAchievedSteps] = useState([])

  const router = useRouter()

  const [currentPath, setCurrentPath] = useState()

  const refreshLocalStorage = (id) => {
    window.localStorage.setItem(
      'vitaliplay.survey.activeStep',
      (id && id.toString()) || '1'
    )
  }

  useEffect(() => {
    if (!window.localStorage.getItem('vitaliplay.survey.store')) {
      window.localStorage.setItem('vitaliplay.survey.store', JSON.stringify({}))
    }
  }, [])

  useEffect(() => {
    setCurrentPath(`/${router.route.split('/')[2]}`)
  }, [router])

  useEffect(() => {
    setAchievedSteps(Array.from(Array(getIdByPath(currentPath)).keys()))
    refreshLocalStorage(getIdByPath(currentPath))
  }, [currentPath])

  const switchSurveyStep = (surveyId) => {
    refreshLocalStorage(surveyId)
    router.push(`${prefix}${getPathById(surveyId)}`)
  }

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      <aside
        style={{ minWidth: '400px' }}
        className="z-20 hidden min-h-screen bg-light-100 shadow-level1 lg:flex"
      >
        <nav className="mt-40">
          <ul className="flex flex-col gap-8 pl-24">
            {surveySteps.map((surveyStep) => {
              if (surveyStep.hidden) return
              return (
                <li key={surveyStep.id}>
                  <div
                    onClick={() => switchSurveyStep(surveyStep.id)}
                    className="flex cursor-pointer items-center"
                  >
                    <div
                      style={{ transitionProperty: 'background-color, color' }}
                      className={`grid h-8 w-8 place-items-center rounded-full font-head font-bold transition ${
                        achievedSteps.includes(surveyStep.id)
                          ? 'bg-blue-900 text-light-100'
                          : currentPath === surveyStep.path
                          ? 'bg-blue-50 text-blue-900'
                          : 'bg-gray-100 text-dark-300'
                      }`}
                    >
                      {surveyStep.id}
                    </div>
                    <span
                      style={{ transitionProperty: 'color' }}
                      className={`ml-4 font-body text-sm font-bold uppercase transition ${
                        currentPath === surveyStep.path
                          ? 'text-blue-900'
                          : achievedSteps.includes(surveyStep.id)
                          ? 'text-blue-300'
                          : 'text-dark-300'
                      }`}
                    >
                      {surveyStep.step}
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
          {surveySteps.map((surveyStep) => {
            if (surveyStep.hidden) return
            return (
              <li
                key={surveyStep.id}
                className={`flex items-center ${
                  surveyStep.id < surveySteps.length - 1 && 'md:w-full'
                }`}
              >
                <div className="relative flex flex-col items-center">
                  <div
                    onClick={() => switchSurveyStep(surveyStep.id)}
                    style={{ transitionProperty: 'background-color, color' }}
                    className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded-full font-head font-bold transition ${
                      achievedSteps.includes(surveyStep.id)
                        ? 'bg-blue-900 text-light-100'
                        : currentPath === surveyStep.path
                        ? 'bg-blue-50 text-blue-900'
                        : 'bg-gray-100 text-dark-300'
                    }`}
                  >
                    {surveyStep.id}
                  </div>
                  <span
                    className={`absolute mt-10 w-24 text-center font-body text-sm font-bold uppercase text-blue-900 ${
                      currentPath === surveyStep.path ? 'block' : 'hidden'
                    }`}
                  >
                    {surveyStep.step}
                  </span>
                </div>

                {surveyStep.id < surveySteps.length - 1 && (
                  <div
                    style={{ transitionProperty: 'width, background-color' }}
                    className={`separator mx-1 h-0.5 transition ${
                      currentPath === surveyStep.path
                        ? 'w-2 bg-gray-100 xsm:w-4 md:w-full'
                        : currentPath === getPathById(surveyStep.id + 1)
                        ? 'w-2 bg-blue-900 xsm:w-4 md:w-full'
                        : achievedSteps.includes(surveyStep.id)
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
