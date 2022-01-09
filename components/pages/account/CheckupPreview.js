import Title from '@/components/utils/Title'
import Cta from '@/components/utils/Cta'
import { useMediaQuery } from '@mui/material'

const CheckupPreview = ({ date, score }) => {
  const isMediumScreen = useMediaQuery('(min-width: 768px)')

  return (
    <div className="flex flex-col items-center justify-between py-6 w-full shadow-level1 rounded-lg">
      <Title as="h4" type="10" color="text-dark-700" html={false}>
        Bilan : {date}
      </Title>
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
  )
}

export default CheckupPreview
