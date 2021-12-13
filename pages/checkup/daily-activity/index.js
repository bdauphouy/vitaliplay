import CheckupLayout from '@/components/layouts/CheckupLayout'
import Title from '@/components/utils/Title'
import Subtitle from '@/components/utils/Subtitle'
import Cta from '@/components/utils/Cta'

const DailyActivity = () => {
  return (
    <div>
      <Title>Etape 3 : Bilan activité quotidienne</Title>
      <div className="mt-4">
        <Subtitle>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. At purus
          pellentesque malesuada pellentesque ultricies leo sit. Ut in sed
          ultricies diam arcu et. Sed lectus feugiat aliquam urna, sed risus
          sed. Integer vestibulum dolor aliquam volutpat lectus.
        </Subtitle>
      </div>
      <div className="mt-12">
        <Cta size="xl">Continuer</Cta>
      </div>
    </div>
  )
}

DailyActivity.Layout = CheckupLayout

export default DailyActivity
