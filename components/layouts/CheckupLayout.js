import { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import { LinksContext } from '@/contexts/LinksContext'
import CloseNav from '@/components/utils/CloseNav'
import { CheckupContextProvider } from '@/contexts/CheckupContext'

const CheckupLayout = ({ children }) => {
  const [achievedSteps, setAchievedSteps] = useState([[0, 1, 2], [0]])
  const { getPage, checkupPages } = useContext(LinksContext)
  const [currentPath, setCurrentPath] = useState('/bilan')
  const router = useRouter()

  useEffect(() => {
    if (!window.localStorage.getItem('vitaliplay.checkup.activeStep')) {
      window.localStorage.setItem('vitaliplay.checkup.activeStep', '1.0')
    }
  }, [])

  useEffect(() => {
    setCurrentPath(router.asPath)
  }, [router])

  useEffect(() => {
    setAchievedSteps([
      Array.from(
        Array(
          parseInt(getPage(checkupPages, 'path', currentPath)?.id.split('.')[0])
        ).keys()
      ),
      Array.from(
        Array(
          parseInt(getPage(checkupPages, 'path', currentPath)?.id.split('.')[1])
        ).keys()
      ),
    ])

    refreshLocalStorage(getPage(checkupPages, 'path', currentPath)?.id)
  }, [currentPath])

  const refreshLocalStorage = (id) => {
    window.localStorage.setItem('vitaliplay.checkup.activeStep', id || '1.0')
  }

  const switchCheckupStep = (checkupId) => {
    refreshLocalStorage(checkupId)

    router.push(getPage(checkupPages, 'id', checkupId).path)
  }

  return (
    <CheckupContextProvider>
      <CloseNav />
      <div className="flex min-h-screen flex-col lg:flex-row">
        <aside
          style={{ minWidth: '400px' }}
          className="z-20 hidden min-h-screen bg-light-100 shadow-level1 lg:flex"
        >
          <nav className="mt-40">
            <ul className="flex flex-col gap-8 pl-24">
              {checkupPages.map((checkupPage) => {
                if (
                  checkupPage.id.split('.')[1] !== '0' ||
                  checkupPage.id === '0.0' ||
                  checkupPage.id === '4.0'
                )
                  return
                return (
                  <li key={checkupPage.id}>
                    <div
                      onClick={() => switchCheckupStep(checkupPage.id)}
                      className="flex cursor-pointer items-center"
                    >
                      <div
                        style={{
                          transitionProperty: 'background-color, color',
                        }}
                        className={`grid h-8 w-8 place-items-center rounded-full font-head font-bold transition ${
                          achievedSteps[0].includes(
                            parseInt(checkupPage.id.split('.')[0])
                          )
                            ? 'bg-blue-900 text-light-100'
                            : currentPath.split('/')[2] ===
                              checkupPage.path.split('/')[2]
                            ? 'bg-blue-50 text-blue-900'
                            : 'bg-gray-100 text-dark-300'
                        }`}
                      >
                        {checkupPage.id.split('.')[0]}
                      </div>
                      <span
                        style={{ transitionProperty: 'color' }}
                        className={`ml-4 font-body text-sm font-bold uppercase transition ${
                          currentPath.split('/')[2] ===
                          checkupPage.path.split('/')[2]
                            ? 'text-blue-900'
                            : achievedSteps[0].includes(
                                parseInt(checkupPage.id.split('.')[0])
                              )
                            ? 'text-blue-300'
                            : 'text-dark-300'
                        }`}
                      >
                        {checkupPage.pageName}
                      </span>
                    </div>
                    <ul
                      style={{ transitionProperty: 'max-height' }}
                      className={`ml-12 mt-4 space-y-4 overflow-hidden transition ${
                        currentPath.split('/')[2] !==
                        checkupPage.path.split('/')[2]
                          ? 'max-h-0'
                          : 'max-h-40'
                      }`}
                    >
                      {checkupPages.map((subPage) => {
                        if (
                          subPage.id.split('.')[0] !==
                            checkupPage.id.split('.')[0] ||
                          subPage.id.split('.')[1] === '0'
                        )
                          return

                        return (
                          <li
                            onClick={() => switchCheckupStep(subPage.id)}
                            style={{ transitionProperty: 'color' }}
                            className={`cursor-pointer font-body text-sm font-bold uppercase transition ${
                              currentPath === subPage.path
                                ? 'text-blue-900'
                                : achievedSteps[1].includes(
                                    parseInt(subPage.id.split('.')[1])
                                  )
                                ? 'text-blue-300'
                                : 'text-dark-300'
                            }`}
                            key={subPage.id}
                          >
                            {subPage.pageName}
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
            {checkupPages.map((checkupPage) => {
              if (
                checkupPage.id.split('.')[1] !== '0' ||
                checkupPage.id === '0.0' ||
                checkupPage.id === '4.0'
              )
                return

              return (
                <li
                  key={checkupPage.id}
                  className={`flex items-center ${
                    parseInt(checkupPage.id.split('.')[0]) <
                      checkupPages.filter(
                        (page) =>
                          page.id.split('.')[1] === '0' &&
                          page.id !== '0.0' &&
                          page.id !== '4.0'
                      ).length && 'w-full'
                  }`}
                >
                  <div className="relative flex flex-col items-center">
                    <div
                      onClick={() => switchCheckupStep(checkupPage.id)}
                      style={{ transitionProperty: 'background-color, color' }}
                      className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded-full font-head font-bold transition duration-300 ${
                        achievedSteps[0].includes(
                          parseInt(checkupPage.id.split('.')[0])
                        )
                          ? 'bg-blue-900 text-light-100'
                          : currentPath.split('/')[2] ===
                            checkupPage.path.split('/')[2]
                          ? 'bg-blue-50 text-blue-900'
                          : 'bg-gray-100 text-dark-300'
                      }`}
                    >
                      {checkupPage.id.split('.')[0]}
                    </div>
                    <span
                      className={`absolute mt-10 w-24 text-center font-body text-sm font-bold uppercase text-blue-900 ${
                        currentPath.split('/')[2] ===
                        checkupPage.path.split('/')[2]
                          ? 'block'
                          : 'hidden'
                      }`}
                    >
                      {checkupPage.pageName}
                    </span>
                  </div>

                  {parseInt(checkupPage.id.split('.')[0]) <
                    checkupPages.filter(
                      (page) =>
                        page.id.split('.')[1] === '0' &&
                        page.id !== '0.0' &&
                        page.id !== '4.0'
                    ).length && (
                    <div
                      style={{ transitionProperty: 'width, background-color' }}
                      className={`separator mx-1 h-0.5 w-full transition ${
                        currentPath.split('/')[2] ===
                        checkupPage.path.split('/')[2]
                          ? 'bg-gray-100'
                          : currentPath ===
                            getPage(
                              checkupPages,
                              'id',
                              parseInt(checkupPage.id.split('.')[0]) + 1
                            )?.path
                          ? 'bg-blue-900'
                          : achievedSteps[0].includes(
                              parseInt(checkupPage.id.split('/')[0])
                            )
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
          <div className="w-full max-w-4xl lg:w-11/12">{children}</div>
        </div>
      </div>
    </CheckupContextProvider>
  )
}

export default CheckupLayout
