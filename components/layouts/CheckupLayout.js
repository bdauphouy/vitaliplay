import { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import { CheckupContext } from '@/contexts/CheckupContext'

const CheckupLayout = ({ children }) => {
  const { prefix, checkupSteps, getIdByPath, getPathByIds } =
    useContext(CheckupContext)

  const [achievedSteps, setAchievedSteps] = useState([[0], [0]])

  const router = useRouter()

  const [currentPath, setCurrentPath] = useState([])

  const refreshLocalStorage = ids => {
    window.localStorage.setItem(
      'vitaliplay.checkup.activeStep',
      (ids && ids.toString()) || '1,0',
    )
  }

  useEffect(() => {
    if (!window.localStorage.getItem('vitaliplay.checkup.activeStep')) {
      window.localStorage.setItem('vitaliplay.checkup.activeStep', '1,0')
    }
  }, [])

  useEffect(() => {
    setCurrentPath(router.asPath.split('/').map(route => `/${route}`))
  }, [router])

  useEffect(() => {
    setAchievedSteps([
      Array.from(Array(getIdByPath(currentPath[2])).keys()),
      Array.from(Array(getIdByPath(currentPath[3])).keys()),
    ])
    refreshLocalStorage([
      getIdByPath(currentPath[2]),
      getIdByPath(currentPath[3]),
    ])
  }, [currentPath])

  const switchCheckupStep = checkupIds => {
    refreshLocalStorage(checkupIds)
    router.push(`${prefix}${getPathByIds(checkupIds)}`)
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
                    onClick={() => switchCheckupStep([checkupStep.id, 0])}
                    className="flex items-center cursor-pointer">
                    <div
                      style={{ transitionProperty: 'background-color, color' }}
                      className={`transition w-8 h-8 grid place-items-center rounded-full font-head font-bold ${
                        achievedSteps[0].includes(checkupStep.id)
                          ? 'text-light-100 bg-blue-900'
                          : currentPath[2] === checkupStep.path
                          ? 'text-blue-900 bg-blue-50'
                          : 'text-dark-300 bg-gray-100'
                      }`}>
                      {checkupStep.id}
                    </div>
                    <span
                      style={{ transitionProperty: 'color' }}
                      className={`transition text-sm font-bold font-body uppercase ml-4 ${
                        currentPath[2] === checkupStep.path
                          ? 'text-blue-900'
                          : achievedSteps[0].includes(checkupStep.id)
                          ? 'text-blue-300'
                          : 'text-dark-300'
                      }`}>
                      {checkupStep.step}
                    </span>
                  </div>
                  <ul
                    style={{ transitionProperty: 'max-height' }}
                    className={`ml-12 mt-4 transition space-y-4 overflow-hidden ${
                      currentPath[2] !== checkupStep.path
                        ? 'max-h-0'
                        : 'max-h-40'
                    }`}>
                    {checkupStep.subSteps?.map(subStep => {
                      return (
                        <li
                          onClick={() =>
                            switchCheckupStep([checkupStep.id, subStep.id])
                          }
                          style={{ transitionProperty: 'color' }}
                          className={`transition cursor-pointer text-sm font-bold font-body uppercase ${
                            currentPath[3] === subStep.path
                              ? 'text-blue-900'
                              : achievedSteps[1].includes(subStep.id)
                              ? 'text-blue-300'
                              : 'text-dark-300'
                          }`}
                          key={subStep.id}>
                          {subStep.step}
                        </li>
                      )
                    })}
                  </ul>
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
                  checkupStep.id < checkupSteps.length - 1 && 'w-full'
                }`}>
                <div className="flex flex-col items-center relative">
                  <div
                    onClick={() => switchCheckupStep([checkupStep.id, 0])}
                    style={{ transitionProperty: 'background-color, color' }}
                    className={`transition duration-300 cursor-pointer w-8 h-8 flex justify-center items-center rounded-full font-head font-bold ${
                      achievedSteps[0].includes(checkupStep.id)
                        ? 'text-light-100 bg-blue-900'
                        : currentPath[2] === checkupStep.path
                        ? 'text-blue-900 bg-blue-50'
                        : 'text-dark-300 bg-gray-100'
                    }`}>
                    {checkupStep.id}
                  </div>
                  <span
                    className={`w-24 text-center text-sm font-body font-bold text-blue-900 uppercase absolute mt-10 ${
                      currentPath[2] === checkupStep.path ? 'block' : 'hidden'
                    }`}>
                    {checkupStep.step}
                  </span>
                </div>

                {checkupStep.id < checkupSteps.length - 1 && (
                  <div
                    style={{ transitionProperty: 'width, background-color' }}
                    className={`transition separator h-0.5 mx-1 w-full ${
                      currentPath[2] === checkupStep.path
                        ? 'bg-gray-100'
                        : currentPath[2] ===
                          getPathByIds([checkupStep.id + 1, 0])
                        ? 'bg-blue-900'
                        : achievedSteps[0].includes(checkupStep.id)
                        ? 'bg-blue-900'
                        : 'bg-gray-100'
                    }`}></div>
                )}
              </li>
            )
          })}
        </ul>
      </nav>
      <div className="px-6 md:px-24 2xl:mr-40 xl:mr-24 py-10 lg:py-40 w-full flex flex-1">
        <div className="lg:w-11/12">{children}</div>
      </div>
    </div>
  )
}

export default CheckupLayout
