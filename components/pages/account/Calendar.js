import moment from 'moment'
import { useEffect, useState } from 'react'

const CalendarHeader = ({ startDate, selectedDate, setSelectedDate }) => {
  startDate = moment(startDate)

  selectedDate = moment(selectedDate)

  return (
    <div className="bg-dark-100">
      <div className="inline-grid w-full grid-cols-7 grid-rows-1 gap-px border-b border-dark-100">
        {[...Array(7).keys()].map((weekDay) => {
          const date = startDate.clone().add(weekDay, 'day')

          return (
            <div
              key={weekDay}
              onClick={() => setSelectedDate(date)}
              className={`${
                date.isSame(selectedDate, 'day')
                  ? 'bg-blue-900 text-light-100'
                  : 'bg-dark-50 text-dark-700'
              } flex cursor-pointer select-none flex-col items-center p-3 first:rounded-tl-lg last:rounded-tr-lg`}
            >
              <p className="font-head text-xl font-bold">{date.format('DD')}</p>
              <p className="text-sm font-normal">{date.format('dddd')}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

const Event = ({ selectedDate, startDate, endDate, name }) => {
  const diff = startDate.diff(moment(), 'days')
  const color = diff < 0 ? 'orange' : diff > 0 ? 'green' : 'blue'

  const colDiff = Math.floor(startDate.diff(selectedDate, 'hours') / 24)
  console.log(colDiff)

  return (
    <div
      starthour={startDate.toDate().getHours()}
      endhour={endDate.toDate().getHours()}
      color={color}
      style={{
        gridColumnStart: colDiff + 4,
      }}
      className={`relative flex flex-col justify-end rounded ${
        color === 'green'
          ? 'bg-green-50'
          : color === 'blue'
          ? 'bg-blue-50'
          : 'bg-orange-50'
      } p-3 ${(() => {
        let startRow
        if (startDate.toDate().getHours() > 16) {
          startRow = 3
        } else if (startDate.toDate().getHours() > 12) {
          startRow = 2
        } else {
          startRow = 1
        }

        switch (startRow) {
          case 1:
            return 'row-start-1'
          case 2:
            return 'row-start-2'
          case 3:
            return 'row-start-3'
        }
      })()} ${(() => {
        let endRow
        if (endDate.toDate().getHours() > 16) {
          endRow = 3
        } else if (endDate.toDate().getHours() > 12) {
          endRow = 2
        } else {
          endRow = 1
        }

        switch (endRow) {
          case 1:
            return 'row-end-2'
          case 2:
            return 'row-end-3'
          case 3:
            return 'row-end-4'
        }
      })()} ${(() => {
        const diff = startDate.diff(selectedDate, 'day')
        return diff <= -3 || diff > 3 ? 'hidden' : ''
      })()} before:absolute before:top-0 before:left-0 before:h-full before:w-1 before:rounded-l ${
        color === 'green'
          ? 'before:bg-green-900'
          : color === 'blue'
          ? 'before:bg-blue-900'
          : 'before:bg-orange-900'
      } before:content-['']`}
    >
      <div>
        <h4 className={`mb-3 text-md font-semibold text-${color}-900`}>
          {name}
        </h4>
        <p className="text-sm font-semibold text-dark-300">
          <span></span>
          {startDate.format('HH:mm')} - {endDate.format('HH:mm')}
        </p>
      </div>

      <div className="flex grow flex-col justify-end">
        <button
          className={`mt-4 rounded px-2 py-1.5 text-md font-semibold text-light-100 transition-[background-color] duration-300 ${(() => {
            switch (color) {
              case 'blue':
                return 'bg-blue-900 hover:bg-blue-700'
              case 'green':
                return 'bg-green-900 hover:bg-green-700'
              case 'orange':
                return 'bg-orange-900 hover:bg-orange-700'
            }
          })()}`}
        >
          Mettre un rappel
        </button>
      </div>
    </div>
  )
}

const Calendar = ({ events, setSelectedDate, selectedDate }) => {
  const [startDate, setStartDate] = useState(moment().subtract(3, 'days'))

  useEffect(() => {
    setStartDate(selectedDate.clone().subtract(3, 'days'))
  }, [selectedDate])
  return (
    <div className="w-full overflow-auto">
      <div className="flex h-[600px] min-w-[800px] flex-col overflow-hidden rounded-lg border border-dark-100 font-body">
        <CalendarHeader
          startDate={startDate}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
        <div className="h-full bg-dark-100">
          <div className="inline-grid h-full w-full grow grid-cols-7 grid-rows-3 gap-px">
            {[...Array(21).keys()].map((i) => {
              const row = i % 3
              const column = Math.floor(i / 3)
              return (
                <div
                  key={i}
                  style={{
                    gridRowStart: row + 1,
                    gridColumnStart: column,
                  }}
                  className={`bg-light-100`}
                ></div>
              )
            })}
            {events.map((event, i) => (
              <Event
                key={i}
                selectedDate={selectedDate}
                startDate={event.startDate}
                endDate={event.endDate}
                name={event.name}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Calendar
