import Cta from '../../utils/Cta'
import { useMediaQuery } from '@mui/material'
import PropTypes from 'prop-types'

const CheckupPreview = ({ mobile = false, date = '01/01/01', score = '0' }) => {
  const isMediumScreen = useMediaQuery('(min-width: 768px)')

  return isMediumScreen || !mobile ? (
    <div className="flex flex-col items-center justify-between py-6 w-full shadow-level1 rounded-lg">
      <h4 className="font-body font-normal text-base lg:text-lg text-dark-700">
        Bilan : {date}
      </h4>
      <h2 className="text-[4rem] text-blue-900 font-head font-extrabold">
        {score}
      </h2>
      <Cta
        type="link"
        arrow="right"
        size={isMediumScreen ? 'l' : 'm'}
        textColor="text-blue-900">
        Voir mon bilan
      </Cta>
    </div>
  ) : (
    mobile && (
      <div className="flex flex-wrap gap-4 justify-between w-full items-center pl-6 pr-8 py-4 shadow-level1 rounded-lg">
        <h2 className="text-[3rem] xsm:text-[4rem] text-blue-900 font-head font-extrabold">
          {score}
        </h2>
        <div>
          <h4 className="text-dark-700 text-base font-bold font-body">
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

CheckupPreview.propTypes = {
  mobile: PropTypes.bool,
  date: PropTypes.string,
  score: PropTypes.string,
}

export default CheckupPreview
