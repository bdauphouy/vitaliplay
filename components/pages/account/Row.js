import DropDown from '@/components/utils/Dropdown'
import Title from '@/components/utils/Title'
import Cta from '@/components/utils/Cta'
import { useMediaQuery } from '@mui/material'
import { useState, useEffect } from 'react'
import { Filter } from '@/components/utils/Icons'

const Row = ({ title, children, type, mobile }) => {
  const [buttonSize, setButtonSize] = useState()

  const [filter, setFilter] = useState('Par pertinence')

  const isLargeScreen = useMediaQuery('(min-width: 768px)')

  useEffect(() => {
    setButtonSize(isLargeScreen ? 'l' : 'm')
  }, [isLargeScreen])

  return (
    <div>
      <header className="flex justify-between items-center px-6 md:px-24 gap-4 md:gap-12">
        <div className="flex-1">
          <Title type="8">{title}</Title>
        </div>
        <div className="flex-5 flex justify-end">
          {type === 'filter' ? (
            <>
              <div className="hidden md:block w-60 lg:w-80">
                <DropDown
                  options={[
                    'Par pertinence',
                    'Popularité',
                    'Recommandé',
                    'Mes favoris',
                  ]}
                  defaultOption={filter}
                  getOption={setFilter}
                />
              </div>
              <div className="md:hidden w-8 h-8 bg-blue-50 rounded-full flex justify-center items-center">
                <Filter color="#1778F2" />
              </div>
            </>
          ) : (
            <Cta size={buttonSize} type="secondary">
              Voir plus
            </Cta>
          )}
        </div>
      </header>
      <div
        className={`px-6 md:px-24 ${
          mobile
            ? 'flex flex-col md:gap-8 gap-4'
            : 'flex flex-row md:gap-8 gap-3'
        } ${
          type === 'filter'
            ? 'flex md:grid mt-8 2xl:grid-cols-[repeat(4,minmax(_288px,_1fr))] xl:grid-cols-[repeat(3,minmax(_288px,_1fr))] lg:grid-cols-[repeat(2,minmax(_288px,_1fr))] md:grid-cols-[repeat(1,minmax(_288px,_1fr))]'
            : 'md:grid-cols-[repeat(4,minmax(_288px,_1fr))] overflow-x-auto'
        } ${
          type === 'checkup'
            ? 'h-72 items-center mt-2 grid grid-cols-[repeat(4,minmax(_224px,_1fr))]'
            : 'flex mt-8 md:grid'
        }`}>
        {children}
      </div>
    </div>
  )
}

export default Row
