import { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import { SurveyContext } from '@/contexts/SurveyContext'

const SurveyLayout = ({ children }) => {
  const { prefix, getPathById, getIdByPath, surveySteps } =
    useContext(SurveyContext)

  const [achievedSteps, setAchievedSteps] = useState([])

  const router = useRouter()

  const [currentPath, setCurrentPath] = useState()

  const refreshLocalStorage = id => {
    window.localStorage.setItem(
      'vitaliplay.survey.activeStep',
      (id && id.toString()) || '1',
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

  const switchSurveyStep = surveyId => {
    refreshLocalStorage(surveyId)
    router.push(`${prefix}${getPathById(surveyId)}`)
  }

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      <aside
        style={{ minWidth: '400px' }}
        className="bg-light-100 z-20 hidden lg:flex shadow-level1 min-h-screen">
        <nav className="mt-40">
          <ul className="flex flex-col gap-8 pl-24">
            {surveySteps.map(surveyStep => {
              if (surveyStep.hidden) return
              return (
                <li key={surveyStep.id}>
                  <div
                    onClick={() => switchSurveyStep(surveyStep.id)}
                    className="flex items-center cursor-pointer">
                    <div
                      style={{ transitionProperty: 'background-color, color' }}
                      className={`transition w-8 h-8 grid place-items-center rounded-full font-head font-bold ${
                        achievedSteps.includes(surveyStep.id)
                          ? 'text-light-100 bg-blue-900'
                          : currentPath === surveyStep.path
                          ? 'text-blue-900 bg-blue-50'
                          : 'text-dark-300 bg-gray-100'
                      }`}>
                      {surveyStep.id}
                    </div>
                    <span
                      style={{ transitionProperty: 'color' }}
                      className={`transition text-sm font-bold font-body uppercase ml-4 ${
                        currentPath === surveyStep.path
                          ? 'text-blue-900'
                          : achievedSteps.includes(surveyStep.id)
                          ? 'text-blue-300'
                          : 'text-dark-300'
                      }`}>
                      {surveyStep.step}
                    </span>
                  </div>
                </li>
              )
            })}
          </ul>
        </nav>
      </aside>
      <nav className="lg:hidden h-48 flex justify-center px-6 md:px-24 shadow-level1 items-end pb-16">
        <ul className="flex relative md:w-full">
          {surveySteps.map(surveyStep => {
            if (surveyStep.hidden) return
            return (
              <li
                key={surveyStep.id}
                className={`flex items-center ${
                  surveyStep.id < surveySteps.length - 1 && 'md:w-full'
                }`}>
                <div className="flex flex-col items-center relative">
                  <div
                    onClick={() => switchSurveyStep(surveyStep.id)}
                    style={{ transitionProperty: 'background-color, color' }}
                    className={`transition cursor-pointer w-8 h-8 flex justify-center items-center rounded-full font-head font-bold ${
                      achievedSteps.includes(surveyStep.id)
                        ? 'text-light-100 bg-blue-900'
                        : currentPath === surveyStep.path
                        ? 'text-blue-900 bg-blue-50'
                        : 'text-dark-300 bg-gray-100'
                    }`}>
                    {surveyStep.id}
                  </div>
                  <span
                    className={`w-24 text-center text-sm font-body font-bold text-blue-900 uppercase absolute mt-10 ${
                      currentPath === surveyStep.path ? 'block' : 'hidden'
                    }`}>
                    {surveyStep.step}
                  </span>
                </div>

                {surveyStep.id < surveySteps.length - 1 && (
                  <div
                    style={{ transitionProperty: 'width, background-color' }}
                    className={`transition separator h-0.5 mx-1 ${
                      currentPath === surveyStep.path
                        ? 'w-2 xsm:w-4 md:w-full bg-gray-100'
                        : currentPath === getPathById(surveyStep.id + 1)
                        ? 'w-2 xsm:w-4 md:w-full bg-blue-900'
                        : achievedSteps.includes(surveyStep.id)
                        ? 'bg-blue-900 w-1 xsm:w-2 md:w-full'
                        : 'bg-gray-100 w-1 xsm:w-2 md:w-full'
                    }`}></div>
                )}
              </li>
            )
          })}
        </ul>
      </nav>
      <div className="px-6 md:px-24 py-10 lg:py-40 w-full flex flex-1">
        <div className="lg:w-11/12">{children}</div>
      </div>
    </div>
  )
}

export default SurveyLayout
