import { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import { CheckupContext } from '@/contexts/CheckupContext'

const CheckupLayout = ({ children }) => {
  const { prefix, checkupSteps, getIdByPath, getPathByIds } =
    useContext(CheckupContext)

  const [achievedSteps, setAchievedSteps] = useState([[0], [0]])

  const router = useRouter()

  const [currentPath, setCurrentPath] = useState([])

  const refreshLocalStorage = (ids) => {
    window.localStorage.setItem(
      'vitaliplay.checkup.activeStep',
      (ids && ids.toString()) || '1,0'
    )
  }

  useEffect(() => {
    if (!window.localStorage.getItem('vitaliplay.checkup.activeStep')) {
      window.localStorage.setItem('vitaliplay.checkup.activeStep', '1,0')
    }
  }, [])

  useEffect(() => {
    setCurrentPath(router.asPath.split('/').map((route) => `/${route}`))
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

  const switchCheckupStep = (checkupIds) => {
    refreshLocalStorage(checkupIds)
    router.push(`${prefix}${getPathByIds(checkupIds)}`)
  }

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      <aside
        style={{ minWidth: '400px' }}
        className="z-20 hidden min-h-screen bg-light-100 shadow-level1 lg:flex"
      >
        <nav className="mt-40">
          <ul className="flex flex-col gap-8 pl-24">
            {checkupSteps.map((checkupStep) => {
              if (checkupStep.hidden) return
              return (
                <li key={checkupStep.id}>
                  <div
                    onClick={() => switchCheckupStep([checkupStep.id, 0])}
                    className="flex cursor-pointer items-center"
                  >
                    <div
                      style={{ transitionProperty: 'background-color, color' }}
                      className={`grid h-8 w-8 place-items-center rounded-full font-head font-bold transition ${
                        achievedSteps[0].includes(checkupStep.id)
                          ? 'bg-blue-900 text-light-100'
                          : currentPath[2] === checkupStep.path
                          ? 'bg-blue-50 text-blue-900'
                          : 'bg-gray-100 text-dark-300'
                      }`}
                    >
                      {checkupStep.id}
                    </div>
                    <span
                      style={{ transitionProperty: 'color' }}
                      className={`ml-4 font-body text-sm font-bold uppercase transition ${
                        currentPath[2] === checkupStep.path
                          ? 'text-blue-900'
                          : achievedSteps[0].includes(checkupStep.id)
                          ? 'text-blue-300'
                          : 'text-dark-300'
                      }`}
                    >
                      {checkupStep.step}
                    </span>
                  </div>
                  <ul
                    style={{ transitionProperty: 'max-height' }}
                    className={`ml-12 mt-4 space-y-4 overflow-hidden transition ${
                      currentPath[2] !== checkupStep.path
                        ? 'max-h-0'
                        : 'max-h-40'
                    }`}
                  >
                    {checkupStep.subSteps?.map((subStep) => {
                      return (
                        <li
                          onClick={() =>
                            switchCheckupStep([checkupStep.id, subStep.id])
                          }
                          style={{ transitionProperty: 'color' }}
                          className={`cursor-pointer font-body text-sm font-bold uppercase transition ${
                            currentPath[3] === subStep.path
                              ? 'text-blue-900'
                              : achievedSteps[1].includes(subStep.id)
                              ? 'text-blue-300'
                              : 'text-dark-300'
                          }`}
                          key={subStep.id}
                        >
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
      <nav className="sticky top-0 flex h-48 items-end justify-center bg-light-100 px-6 pb-16 shadow-level1 md:px-24 lg:hidden">
        <ul className="relative flex w-full px-10">
          {checkupSteps.map((checkupStep) => {
            if (checkupStep.hidden) return
            return (
              <li
                key={checkupStep.id}
                className={`flex items-center ${
                  checkupStep.id < checkupSteps.length - 1 && 'w-full'
                }`}
              >
                <div className="relative flex flex-col items-center">
                  <div
                    onClick={() => switchCheckupStep([checkupStep.id, 0])}
                    style={{ transitionProperty: 'background-color, color' }}
                    className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded-full font-head font-bold transition duration-300 ${
                      achievedSteps[0].includes(checkupStep.id)
                        ? 'bg-blue-900 text-light-100'
                        : currentPath[2] === checkupStep.path
                        ? 'bg-blue-50 text-blue-900'
                        : 'bg-gray-100 text-dark-300'
                    }`}
                  >
                    {checkupStep.id}
                  </div>
                  <span
                    className={`absolute mt-10 w-24 text-center font-body text-sm font-bold uppercase text-blue-900 ${
                      currentPath[2] === checkupStep.path ? 'block' : 'hidden'
                    }`}
                  >
                    {checkupStep.step}
                  </span>
                </div>

                {checkupStep.id < checkupSteps.length - 1 && (
                  <div
                    style={{ transitionProperty: 'width, background-color' }}
                    className={`separator mx-1 h-0.5 w-full transition ${
                      currentPath[2] === checkupStep.path
                        ? 'bg-gray-100'
                        : currentPath[2] ===
                          getPathByIds([checkupStep.id + 1, 0])
                        ? 'bg-blue-900'
                        : achievedSteps[0].includes(checkupStep.id)
                        ? 'bg-blue-900'
                        : 'bg-gray-100'
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

export default CheckupLayout
