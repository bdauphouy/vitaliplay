import CheckupPreview from '../components/pages/account/CheckupPreview'

export default {
  title: 'Pages/Account/CheckupPreview',
  component: CheckupPreview,
}

export const Default = args => {
  return (
    <div style={{ width: 288 }}>
      <CheckupPreview {...args} />
    </div>
  )
}
