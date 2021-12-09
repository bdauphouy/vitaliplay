import { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import { CheckupContext } from '@/contexts/CheckupContext'

const CheckupLayout = ({ children }) => {
  const { prefix, checkupSteps, getIdByPath, getPathById } =
    useContext(CheckupContext)

  const [achievedSteps, setAchievedSteps] = useState([])

  const router = useRouter()

  const [currentPath, setCurrentPath] = useState()

  const refreshLocalStorage = id => {
    window.localStorage.setItem(
      'vitaliplay.checkup.activeStep',
      (id && id.toString()) || 1,
    )
  }

  useEffect(() => {
    setCurrentPath(`/${router.route.split('/')[2]}`)
  }, [router])

  useEffect(() => {
    setAchievedSteps(Array.from(Array(getIdByPath(currentPath)).keys()))
    refreshLocalStorage(getIdByPath(currentPath))
  }, [currentPath])

  const switchCheckupStep = surveyId => {
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
            {checkupSteps.map(checkupStep => {
              if (checkupStep.hidden) return
              return (
                <li key={checkupStep.id}>
                  <div
                    onClick={() => switchCheckupStep(checkupStep.id)}
                    className="flex items-center cursor-pointer">
                    <div
                      style={{ transitionProperty: 'background-color, color' }}
                      className={`transition w-8 h-8 grid place-items-center rounded-full font-head font-bold ${
                        achievedSteps.includes(checkupStep.id)
                          ? 'text-light-100 bg-blue-900'
                          : currentPath === checkupStep.path
                          ? 'text-blue-900 bg-blue-50'
                          : 'text-dark-300 bg-gray-100'
                      }`}>
                      {checkupStep.id}
                    </div>
                    <span
                      style={{ transitionProperty: 'color' }}
                      className={`transition text-sm font-bold font-body uppercase ml-4 ${
                        currentPath === checkupStep.path
                          ? 'text-blue-900'
                          : achievedSteps.includes(checkupStep.id)
                          ? 'text-blue-300'
                          : 'text-dark-300'
                      }`}>
                      {checkupStep.step}
                    </span>
                  </div>
                </li>
              )
            })}
          </ul>
        </nav>
      </aside>
      <nav className="lg:hidden h-48 flex justify-center px-6 md:px-24 shadow-level1 items-end pb-16">
        <ul className="flex relative w-full px-10">
          {checkupSteps.map(checkupStep => {
            if (checkupStep.hidden) return
            return (
              <li
                key={checkupStep.id}
                className={`flex items-center ${
                  checkupStep.id < checkupSteps.length && 'w-full'
                }`}>
                <div className="flex flex-col items-center relative">
                  <div
                    onClick={() => switchCheckupStep(checkupStep.id)}
                    style={{ transitionProperty: 'background-color, color' }}
                    className={`transition cursor-pointer w-8 h-8 flex justify-center items-center rounded-full font-head font-bold ${
                      achievedSteps.includes(checkupStep.id)
                        ? 'text-light-100 bg-blue-900'
                        : currentPath === checkupStep.path
                        ? 'text-blue-900 bg-blue-50'
                        : 'text-dark-300 bg-gray-100'
                    }`}>
                    {checkupStep.id}
                  </div>
                  <span
                    className={`w-24 text-center text-sm font-body font-bold text-blue-900 uppercase absolute mt-10 ${
                      currentPath === checkupStep.path ? 'block' : 'hidden'
                    }`}>
                    {checkupStep.step}
                  </span>
                </div>

                {checkupStep.id < checkupSteps.length && (
                  <div
                    style={{ transitionProperty: 'width, background-color' }}
                    className={`transition separator h-0.5 mx-1 w-full ${
                      currentPath === checkupStep.path
                        ? 'bg-gray-100'
                        : currentPath === getPathById(checkupStep.id + 1)
                        ? 'bg-blue-900'
                        : achievedSteps.includes(checkupStep.id)
                        ? 'bg-blue-900'
                        : 'bg-gray-100'
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

export default CheckupLayout
