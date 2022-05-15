import Dropdown from '@/components/utils/Dropdown'
import Cta from '@/components/utils/Cta'
import { useMediaQuery } from '@mui/material'
import { useState, useEffect } from 'react'
import { Filter } from '@/components/utils/Icons'
import { CheckMark } from '@/components/utils/Icons'
import Link from 'next/link'
import { useRouter } from 'next/router'

const Row = ({
  title,
  filterOptions,
  button = true,
  children,
  path = '/',
  type,
  mobile,
}) => {
  const [buttonSize, setButtonSize] = useState()

  const [filter, setFilter] = useState(filterOptions ? filterOptions[0] : '')

  const [filterScreen, setFilterScreen] = useState(false)

  const isLargeScreen = useMediaQuery('(min-width: 768px)')

  const router = useRouter()

  useEffect(() => {
    setButtonSize(isLargeScreen ? 'l' : 'm')
  }, [isLargeScreen])

  useEffect(() => {
    if (type === 'filter') {
      router.replace(
        `${router.route.replace('[id]', router.query.id)}?filtre=${filter}`
      )
    }

    setFilterScreen(false)
  }, [filter])

  return (
    <div>
      <header className="flex items-center justify-between gap-4 px-6 md:gap-12 md:px-24">
        <div className="flex-1">
          <h2 className="font-head text-xl font-bold text-dark-900 md:text-3xl lg:text-4xl">
            {title}
          </h2>
        </div>
        {button && (
          <div className="flex justify-end">
            {type === 'filter' ? (
              <>
                <div className="hidden w-60 md:block lg:w-80">
                  <Dropdown
                    options={filterOptions}
                    defaultOption={filter}
                    getOption={setFilter}
                  />
                </div>
                <div>
                  <div
                    onClick={() => setFilterScreen(true)}
                    className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-blue-50 md:hidden"
                  >
                    <Filter color="#1778F2" />
                  </div>
                  {filterScreen && (
                    <div className="absolute left-0 top-0 z-50 h-full w-full bg-light-100">
                      <div
                        className="p-6"
                        onClick={() => setFilterScreen(false)}
                      >
                        <Cta arrow="left" type="secondary">
                          Retour
                        </Cta>
                        <div className="mt-10">
                          <h2 className="font-head text-xl font-bold text-dark-900 md:text-3xl lg:text-4xl">
                            Filtres
                          </h2>
                        </div>
                      </div>
                      <div className="border-b-1 border-solid border-dark-50">
                        {filterOptions.map((filterOption, i) => {
                          return (
                            <div
                              onClick={() => setFilter(filterOption)}
                              className="flex cursor-pointer items-center justify-between border-t-1 border-solid border-dark-50 px-6 py-3"
                              key={i}
                            >
                              <span className="font-body text-base text-dark-500">
                                {filterOption}
                              </span>
                              {filterOption === filter && (
                                <CheckMark color="#1778F2" size="24" />
                              )}
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : type === 'none' ? null : (
              <div onClick={() => router.push(path)}>
                <Cta size={buttonSize} type="secondary">
                  Voir plus
                </Cta>
              </div>
            )}
          </div>
        )}
      </header>
      <div
        className={`px-6 md:px-24 ${
          mobile
            ? 'flex flex-col gap-4 md:gap-8'
            : 'flex flex-row gap-3 md:gap-8'
        } ${
          type === 'filter'
            ? 'mt-4 flex flex-col md:mt-8 md:grid  md:grid-cols-[repeat(4,minmax(_288px,_1fr))] xl:grid-cols-[repeat(4,minmax(_224px,_1fr))] 2xl:grid-cols-[repeat(4,minmax(_288px,_1fr))]'
            : type === 'grid'
            ? 'mt-4 flex flex-col md:mt-8 md:grid'
            : 'mt-4 grid grid-cols-[repeat(4,minmax(_224px,_1fr))] items-center gap-3 overflow-x-auto md:mt-8 md:grid-cols-[repeat(4,minmax(_288px,_1fr))] xl:grid-cols-[repeat(4,minmax(_224px,_1fr))] 2xl:grid-cols-[repeat(4,minmax(_288px,_1fr))]'
        }`}
      >
        {children}
      </div>
    </div>
  )
}

export default Row
