import { useState, useEffect } from 'react'

const SurveyLayout = ({ children }) => {
  const [surveySteps] = useState([
    { id: 1, step: 'Inscription', path: '/signup' },
    { id: 2, step: 'Mensuration', path: '/measurements' },
    { id: 3, step: 'Fumeur', path: '/smoker' },
    { id: 4, step: 'Douleurs chroniques', path: '/pain' },
    { id: 5, step: 'Affection longue durée', path: '/affection' },
    { id: 6, step: 'Prothèse articulaire', path: '/prosthesis' },
  ])

  const [achievedSteps, setAchievedSteps] = useState([])

  const [activeStep, setActiveStep] = useState(1)

  useEffect(() => {
    setAchievedSteps([...Array.from(Array(activeStep).keys())])
  }, [activeStep])

  return (
    <>
      <aside className="hidden lg:flex w-96 shadow-level1 min-h-screen">
        <nav className="mt-40">
          <ul className="flex flex-col gap-8 pl-24">
            {surveySteps.map(surveyStep => {
              return (
                <li key={surveyStep.id}>
                  <div
                    onClick={() => setActiveStep(surveyStep.id)}
                    className="flex items-center cursor-pointer">
                    <div
                      style={{ transitionProperty: 'background-color, color' }}
                      className={`transition w-8 h-8 grid place-items-center rounded-full font-head font-bold ${
                        achievedSteps.includes(surveyStep.id)
                          ? 'text-light-100 bg-blue-900'
                          : activeStep === surveyStep.id
                          ? 'text-blue-900 bg-blue-50'
                          : 'text-dark-300 bg-gray-100'
                      }`}>
                      {surveyStep.id}
                    </div>
                    <span
                      style={{ transitionProperty: 'color' }}
                      className={`transition text-sm font-bold font-body uppercase ml-4 ${
                        activeStep === surveyStep.id
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
      <nav className="lg:hidden mt-24 flex justify-center px-6 md:px-24">
        <ul className="flex relative md:w-full">
          {surveySteps.map(surveyStep => {
            return (
              <li
                key={surveyStep.id}
                className={`flex items-center ${
                  surveyStep.id < surveySteps.length && 'md:w-full'
                }`}>
                <div className="flex flex-col items-center relative">
                  <div
                    onClick={() => setActiveStep(surveyStep.id)}
                    style={{ transitionProperty: 'background-color, color' }}
                    className={`transition cursor-pointer w-8 h-8 grid place-items-center rounded-full font-head font-bold ${
                      achievedSteps.includes(surveyStep.id)
                        ? 'text-light-100 bg-blue-900'
                        : activeStep === surveyStep.id
                        ? 'text-blue-900 bg-blue-50'
                        : 'text-dark-300 bg-gray-100'
                    }`}>
                    {surveyStep.id}
                  </div>
                  <span
                    className={`w-24 text-center text-sm font-body font-bold text-blue-900 uppercase absolute mt-10 ${
                      activeStep === surveyStep.id ? 'block' : 'hidden'
                    }`}>
                    {surveyStep.step}
                  </span>
                </div>

                {surveyStep.id < surveySteps.length && (
                  <div
                    style={{ transitionProperty: 'width, background-color' }}
                    className={`transition separator h-0.5 mx-1 ${
                      activeStep === surveyStep.id ||
                      activeStep === surveyStep.id + 1
                        ? 'bg-blue-900 w-2 xsm:w-4 md:w-full'
                        : achievedSteps.includes(surveyStep.id)
                        ? 'bg-blue-900 w-1 xsm:w-2 md:w-full'
                        : 'bg-gray-300 w-1 xsm:w-2 md:w-full'
                    }`}></div>
                )}
              </li>
            )
          })}
        </ul>
      </nav>
      {children}
    </>
  )
}

export default SurveyLayout
