import Card from '../components/pages/account/Card'

export default {
  title: 'Pages/Account/Card',
  component: Card,
}

export const Default = args => {
  return (
    <div style={{ width: 288 }}>
      <Card {...args} />
    </div>
  )
}
