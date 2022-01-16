import { PropTypes } from 'prop-types'
import Cta from '@/components/utils/Cta'

Cta.propTypes = {
  children: PropTypes.string,
  size: PropTypes.oneOf(['s', 'm', 'l', 'xl']),
  buttonType: PropTypes.string,
  type: PropTypes.oneOf(['primary', 'secondary', 'disabled', 'link']),
  arrow: PropTypes.oneOf(['left', 'right']),
  invert: PropTypes.bool,
  textColor: PropTypes.string,
}
