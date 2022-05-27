import Subtitle from '@/components/utils/Subtitle'
import { ChevronRight } from '@/components/utils/Icons'
import { useRouter } from 'next/router'
import AccountDecorationLayout from '@/components/layouts/AccountDecorationLayout'
import { UploadProfilePicture } from '@/components/utils/Icons'
import { useRef, useEffect, useState } from 'react'
import {
  postAPIWithToken,
  getToken,
  getUserData,
  fetchAPIWithToken,
  getUserProfilePicture,
  postProfilePicture,
} from '@/lib/api'
import moment from 'moment'

export const getServerSideProps = async ({ req }) => {
  if (!req.cookies.jwt) {
    return {
      redirect: {
        destination: '/connexion',
        permanent: true,
      },
    }
  }

  const paid = await fetchAPIWithToken(
    '/users/me/subscription',
    req.cookies.jwt,
    false
  )

  if (paid.status !== 'paid') {
    return {
      redirect: {
        destination: '/abonnements',
        permanent: true,
      },
    }
  }

  return { props: {} }
}

export const Section = ({ id, icon, title, path = '/' }) => {
  const router = useRouter()

  return (
    <div
      onClick={() => router.push(router.asPath + path)}
      className={`flex cursor-pointer items-center justify-between border-solid px-7 py-4 ${
        id === '0' ? '' : 'border-t-1'
      } border-dark-100 bg-light-100 transition-[background-color] duration-300 hover:bg-dark-50`}
    >
      <Subtitle color="text-dark-900" type="4" html={false}>
        {title}
      </Subtitle>
      <ChevronRight color="#A1A1A1" size="24" />
    </div>
  )
}

const Spin = () => {
  return (
    <svg
      role="status"
      className="dark:text-gray-600 h-6 w-6 animate-spin fill-blue-900 text-blue-300"
      viewBox="0 0 100 101"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
        fill="currentColor"
      />
      <path
        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
        fill="currentFill"
      />
    </svg>
  )
}

const Profile = ({}) => {
  const updateProfilePictureInput = useRef()

  const [userImage, setUserImage] = useState()

  const updateProfilePicture = async () => {
    const { profilePicture } = await getUserProfilePicture(getToken())

    setUserImage(profilePicture)
  }

  const postNewProfilePicture = async () => {
    const file = updateProfilePictureInput.current.files[0]
    setLoading(true)
    await postProfilePicture(file, getToken())
    setLoading(false)
    updateProfilePicture()
  }

  const [loading, setLoading] = useState(false)

  const [user, setUser] = useState()

  const [subscription, setSubscription] = useState()

  useEffect(() => {
    const fetchSubscription = async () => {
      setSubscription(
        await fetchAPIWithToken('/users/me/subscription', getToken(), false)
      )
    }

    const fetchUser = async () => {
      setUser(await getUserData(getToken()))
    }

    fetchSubscription()
    fetchUser()

    updateProfilePicture()

    updateProfilePictureInput.current?.removeEventListener(
      'input',
      postNewProfilePicture
    )
    updateProfilePictureInput.current.addEventListener(
      'input',
      postNewProfilePicture
    )
    return () =>
      updateProfilePictureInput.current?.removeEventListener(
        'input',
        postNewProfilePicture
      )
  }, [])

  return (
    <div className="mx-auto mt-20 min-h-[calc(100vh-165px)] max-w-4xl py-10 md:px-24 lg:pt-20">
      <div className="flex flex-col items-center">
        <label
          htmlFor="update-profile-picture"
          className="group relative mb-6 h-36 w-36 cursor-pointer rounded-full bg-dark-100 bg-cover lg:mb-8"
          style={{
            backgroundImage: `url(${userImage})`,
          }}
        >
          <button
            onClick={() => updateProfilePictureInput.current.click()}
            className="absolute right-0 bottom-0 flex rounded-full border-2 border-solid border-transparent bg-blue-100 p-2 transition-[border-color] duration-200 group-hover:border-blue-900"
          >
            {loading ? <Spin /> : <UploadProfilePicture />}
          </button>
        </label>
        <input
          id="update-profile-picture"
          ref={updateProfilePictureInput}
          accept="image/png, image/jpeg"
          type="file"
          className="hidden"
        />
        <h2 className="text-center font-head text-lg font-bold text-dark-900 md:text-xl">
          {user?.firstname} {user?.lastname}
        </h2>

        <div className="mt-2 lg:mt-3">
          <Subtitle type="4" center={true} html={false}>
            Abonnement valable jusqu’au{' '}
            {moment(subscription?.endDate).format('D MMMM YYYY')}
          </Subtitle>
        </div>
      </div>
      <div className="mt-10 overflow-hidden border-1 border-dark-100 md:rounded-lg">
        <Section
          id="0"
          title="Informations personnelles"
          path="/informations-personnelles"
        />
        <Section
          id="1"
          title="Changer de mot de passe"
          path="/changer-mot-de-passe"
        />
        <Section
          id="2"
          title="Actualiser les informations de santé"
          path="/informations-de-sante"
        />
        <Section
          id="3"
          title="Mes cartes et factures"
          path="/mes-cartes-et-factures"
        />
        <Section id="4" title="Historique" path="/historique" />
        <Section id="5" title="Déconnexion" path="/deconnexion" />
      </div>
    </div>
  )
}

Profile.Layout = AccountDecorationLayout

export default Profile
