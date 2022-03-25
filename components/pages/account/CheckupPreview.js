import Cta from '../../utils/Cta'
import { useMediaQuery } from '@mui/material'

const CheckupPreview = ({ mobile = false, date = '01/01/01', score = '0' }) => {
  const isMediumScreen = useMediaQuery('(min-width: 768px)')

  return isMediumScreen || !mobile ? (
    <div className="flex w-full flex-col items-center justify-between rounded-lg py-6 shadow-level1">
      <h4 className="font-body text-base font-normal text-dark-700 lg:text-lg">
        Bilan : {date}
      </h4>
      <h2 className="font-head text-[4rem] font-extrabold text-blue-900">
        {score}
      </h2>
      <Cta
        type="link"
        arrow="right"
        size={isMediumScreen ? 'l' : 'm'}
        textColor="text-blue-900"
      >
        Voir mon bilan
      </Cta>
    </div>
  ) : (
    mobile && (
      <div className="flex w-full flex-wrap items-center justify-between gap-4 rounded-lg py-4 pl-6 pr-8 shadow-level1">
        <h2 className="font-head text-[3rem] font-extrabold text-blue-900 xsm:text-[4rem]">
          {score}
        </h2>
        <div>
          <h4 className="font-body text-base font-bold text-dark-700">
            Bilan : {date}
          </h4>
          <Cta type="link" arrow="right" size="m" textColor="text-blue-900">
            Voir mon bilan
          </Cta>
        </div>
      </div>
    )
  )
}

export default CheckupPreview
