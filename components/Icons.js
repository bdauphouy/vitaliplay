export const ArrowLeft = ({ color = 'stroke-light', size = 18 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={color}
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M18 12H5"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 19L5 12L12 5"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export const ArrowRight = ({ color = 'stroke-light', size = 18 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={color}
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M5 12H19"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 5L19 12L12 19"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export const Bookmark = ({
  selected = true,
  color = 'stroke-light',
  size = 18,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={`${color} ${selected && 'fill-primary'}`}
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 16L19 21V5C19 4.46957 18.7893 3.96086 18.4142 3.58579C18.0391 3.21071 17.5304 3 17 3H7C6.46957 3 5.96086 3.21071 5.58579 3.58579C5.21071 3.96086 5 4.46957 5 5V21L12 16Z"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export const User = ({ color = 'stroke-light', size = 18 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={color}
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export const ChevronDown = ({ color = 'stroke-light', size = 18 }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className={color}
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M6 9L12 15L18 9"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export const ChevronRight = ({ color = 'stroke-light', size = 18 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={color}
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M9 18L15 12L9 6"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export const Add = ({ color = 'stroke-light', size = 18 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 5V19"
        stroke="#1778F2"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5 12H19"
        stroke="#1778F2"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export const Instagram = ({ color = 'fill-blue-50', size = 40 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        className={color}
        d="M24.715 10.5033C23.485 10.4467 23.115 10.4367 20 10.4367C16.885 10.4367 16.5167 10.4483 15.2867 10.5033C12.1217 10.6483 10.6483 12.1467 10.5033 15.2867C10.4483 16.5167 10.435 16.885 10.435 20C10.435 23.115 10.4483 23.4833 10.5033 24.715C10.6483 27.8467 12.115 29.3533 15.2867 29.4983C16.515 29.5533 16.885 29.5667 20 29.5667C23.1167 29.5667 23.485 29.555 24.715 29.4983C27.88 29.355 29.3517 27.8517 29.4983 24.715C29.5533 23.485 29.565 23.115 29.565 20C29.565 16.885 29.5533 16.5167 29.4983 15.2867C29.3517 12.1483 27.8767 10.6483 24.715 10.5033ZM20 25.9917C16.6917 25.9917 14.0083 23.31 14.0083 20C14.0083 16.6917 16.6917 14.01 20 14.01C23.3083 14.01 25.9917 16.6917 25.9917 20C25.9917 23.3083 23.3083 25.9917 20 25.9917ZM26.2283 15.1733C25.455 15.1733 24.8283 14.5467 24.8283 13.7733C24.8283 13 25.455 12.3733 26.2283 12.3733C27.0017 12.3733 27.6283 13 27.6283 13.7733C27.6283 14.545 27.0017 15.1733 26.2283 15.1733ZM23.8883 20C23.8883 22.1483 22.1467 23.8883 20 23.8883C17.8533 23.8883 16.1117 22.1483 16.1117 20C16.1117 17.8517 17.8533 16.1117 20 16.1117C22.1467 16.1117 23.8883 17.8517 23.8883 20ZM20 0C8.955 0 0 8.955 0 20C0 31.045 8.955 40 20 40C31.045 40 40 31.045 40 20C40 8.955 31.045 0 20 0ZM31.5967 24.81C31.405 29.0517 29.0433 31.4017 24.8117 31.5967C23.5667 31.6533 23.1683 31.6667 20 31.6667C16.8317 31.6667 16.435 31.6533 15.19 31.5967C10.95 31.4017 8.59833 29.0483 8.40333 24.81C8.34667 23.5667 8.33333 23.1683 8.33333 20C8.33333 16.8317 8.34667 16.435 8.40333 15.19C8.59833 10.95 10.9517 8.59833 15.19 8.405C16.435 8.34667 16.8317 8.33333 20 8.33333C23.1683 8.33333 23.5667 8.34667 24.8117 8.405C29.0533 8.6 31.4067 10.9583 31.5967 15.19C31.6533 16.435 31.6667 16.8317 31.6667 20C31.6667 23.1683 31.6533 23.5667 31.5967 24.81Z"
      />
    </svg>
  )
}

export const Twitter = ({ color = 'fill-blue-50', size = 40 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        className={color}
        d="M20 0C8.955 0 0 8.955 0 20C0 31.045 8.955 40 20 40C31.045 40 40 31.045 40 20C40 8.955 31.045 0 20 0ZM30.11 16.075C30.415 22.8083 25.3933 30.315 16.5033 30.315C13.8 30.315 11.285 29.5217 9.16667 28.1633C11.7067 28.4633 14.2417 27.7567 16.2533 26.1817C14.16 26.1433 12.3917 24.7583 11.78 22.8567C12.5317 23 13.2717 22.9583 13.9433 22.775C11.6417 22.3117 10.0517 20.2383 10.1033 18.02C10.75 18.3783 11.4867 18.5933 12.2717 18.6183C10.14 17.1933 9.53667 14.3783 10.79 12.2267C13.15 15.1233 16.6783 17.0283 20.6567 17.2283C19.9583 14.235 22.23 11.35 25.3217 11.35C26.6967 11.35 27.9417 11.9317 28.815 12.8617C29.905 12.6483 30.9317 12.2483 31.855 11.7C31.4967 12.8183 30.7383 13.755 29.75 14.3483C30.7183 14.2317 31.6417 13.975 32.4983 13.5933C31.8583 14.5567 31.0483 15.4 30.11 16.075Z"
      />
    </svg>
  )
}

export const Facebook = ({ color = 'fill-blue-50', size = 40 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        className={color}
        d="M20 0C8.955 0 0 8.955 0 20C0 31.045 8.955 40 20 40C31.045 40 40 31.045 40 20C40 8.955 31.045 0 20 0ZM25 13.3333H22.75C21.8533 13.3333 21.6667 13.7017 21.6667 14.63V16.6667H25L24.6517 20H21.6667V31.6667H16.6667V20H13.3333V16.6667H16.6667V12.82C16.6667 9.87167 18.2183 8.33333 21.715 8.33333H25V13.3333Z"
      />
    </svg>
  )
}

export const Linkedin = ({ color = 'fill-blue-50', size = 40 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        className={color}
        d="M20 0C8.955 0 0 8.955 0 20C0 31.045 8.955 40 20 40C31.045 40 40 31.045 40 20C40 8.955 31.045 0 20 0ZM16.6667 26.6667H13.3333V16.6667H16.6667V26.6667ZM15 15.1817C13.9883 15.1817 13.1667 14.355 13.1667 13.3333C13.1667 12.3133 13.9867 11.485 15 11.485C16.0133 11.485 16.8333 12.3133 16.8333 13.3333C16.8333 14.355 16.0117 15.1817 15 15.1817ZM28.3333 26.6667H25.0033V21.8983C25.0033 18.7633 21.6667 19.0283 21.6667 21.8983V26.6667H18.3333V16.6667H21.6667V18.4883C23.12 15.795 28.3333 15.595 28.3333 21.0683V26.6667Z"
      />
    </svg>
  )
}

export const Gift = ({ color = 'stroke-dark', size = 40 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_129_1840)">
        <path
          className={color}
          d="M37.0883 26.5442L33.9063 42.9043L7.73016 37.8132L10.9121 21.4531"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          className={color}
          d="M41.9512 19.0006L9.23096 12.6367L7.63998 20.8168L40.3602 27.1807L41.9512 19.0006Z"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          className={color}
          d="M20.8181 40.3585L25.5911 15.8184"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          className={color}
          d="M18.229 14.3876L25.5911 15.8195C25.5911 15.8195 25.546 7.32128 19.82 6.2076C18.7353 5.99662 17.6111 6.2252 16.6949 6.84304C15.7787 7.46089 15.1455 8.41739 14.9345 9.50213C14.7235 10.5869 14.9521 11.711 15.5699 12.6272C16.1878 13.5434 17.1443 14.1767 18.229 14.3876Z"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          className={color}
          d="M32.9532 17.2506L25.5912 15.8187C25.5912 15.8187 28.8181 7.95687 34.5442 9.07055C35.6289 9.28152 36.5854 9.91477 37.2033 10.831C37.8211 11.7472 38.0497 12.8713 37.8387 13.9561C37.6277 15.0408 36.9945 15.9973 36.0783 16.6152C35.1621 17.233 34.0379 17.4616 32.9532 17.2506Z"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_129_1840">
          <rect
            width="40"
            height="40"
            fill="white"
            transform="translate(8.18628 0.548828) rotate(11.0063)"
          />
        </clipPath>
      </defs>
    </svg>
  )
}
