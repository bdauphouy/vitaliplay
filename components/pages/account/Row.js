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
        `/${router.route.split('/').slice(2).join('/')}?filter=${filter}`,
      )
    }
  }, [filter])

  return (
    <div>
      <header className="flex justify-between items-center px-6 md:px-24 gap-4 md:gap-12">
        <div className="flex-1">
          <h2 className="font-bold font-head text-dark-900 text-xl md:text-3xl lg:text-4xl">
            {title}
          </h2>
        </div>
        {button && (
          <div className="flex justify-end">
            {type === 'filter' ? (
              <>
                <div className="hidden md:block w-60 lg:w-80">
                  <Dropdown
                    options={filterOptions}
                    defaultOption={filter}
                    getOption={setFilter}
                  />
                </div>
                <div>
                  <div
                    onClick={() => setFilterScreen(true)}
                    className="cursor-pointer md:hidden w-8 h-8 bg-blue-50 rounded-full flex justify-center items-center">
                    <Filter color="#1778F2" />
                  </div>
                  {filterScreen && (
                    <div className="absolute left-0 top-0 h-full w-full bg-light-100 z-50">
                      <div
                        className="p-6"
                        onClick={() => setFilterScreen(false)}>
                        <Cta arrow="left" type="secondary">
                          Retour
                        </Cta>
                        <div className="mt-10">
                          <h2 className="font-bold font-head text-dark-900 text-xl md:text-3xl lg:text-4xl">
                            Filtres
                          </h2>
                        </div>
                      </div>
                      <div className="border-b-1 border-solid border-dark-50">
                        {filterOptions.map((filterOption, i) => {
                          return (
                            <div
                              onClick={() => setFilter(filterOption)}
                              className="flex justify-between items-center cursor-pointer px-6 border-t-1 border-solid border-dark-50 py-3"
                              key={i}>
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
            ) : (
              <Link href={router.asPath + path} passHref>
                <a>
                  <Cta size={buttonSize} type="secondary">
                    Voir plus
                  </Cta>
                </a>
              </Link>
            )}
          </div>
        )}
      </header>
      <div
        className={`px-6 md:px-24 ${
          mobile
            ? 'flex flex-col md:gap-8 gap-4'
            : 'flex flex-row md:gap-8 gap-3'
        } ${
          type === 'filter'
            ? 'flex md:grid mt-4 md:mt-8 2xl:grid-cols-[repeat(4,minmax(_288px,_1fr))] xl:grid-cols-[repeat(3,minmax(_288px,_1fr))] lg:grid-cols-[repeat(2,minmax(_288px,_1fr))] md:grid-cols-[repeat(1,minmax(_288px,_1fr))]'
            : type === 'grid'
            ? 'flex flex-col mt-4 md:mt-8 md:grid'
            : 'items-center mt-4 md:mt-8 gap-3 grid grid-cols-[repeat(4,minmax(_224px,_1fr))] md:grid-cols-[repeat(4,minmax(_288px,_1fr))] overflow-x-auto'
        }`}>
        {children}
      </div>
    </div>
  )
}

export default Row
