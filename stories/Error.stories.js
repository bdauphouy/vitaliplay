import Error from '../components/utils/Error'

export default {
  title: 'Utils/Error',
  component: Error,
}

export const Default = args => {
  return <Error {...args} />
}
