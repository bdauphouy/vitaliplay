import Subtitle from '@/components/utils/Subtitle'
import { ChevronRight } from '@/components/utils/Icons'
import { useRouter } from 'next/router'
import AccountDecorationLayout from '@/components/layouts/AccountDecorationLayout'
import { UploadProfilePicture } from '@/components/utils/Icons'
import { useRef } from 'react'
import { useEffect } from 'react'
import { useCallback } from 'react'
import { useState } from 'react'

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

const Profile = () => {
  const updateProfilePictureInput = useRef()

  const getImage = () => {
    console.log(updateProfilePictureInput.current.files[0])
  }

  const handleProfilePictureUpdate = () => {
    updateProfilePictureInput.current.addEventListener('input', getImage)
  }

  useEffect(() => {
    return (
      () => updateProfilePictureInput.current,
      removeEventListener('input', getImage)
    )
  }, [])

  return (
    <div className="mx-auto mt-20 min-h-[calc(100vh-165px)] max-w-4xl py-10 md:px-24 lg:pt-20">
      <div className="flex flex-col items-center">
        <label
          htmlFor="update-profile-picture"
          onClick={handleProfilePictureUpdate}
          className="group relative mb-6 h-36 w-36 cursor-pointer rounded-full bg-dark-100 bg-[url(https://thispersondoesnotexist.com/image)] bg-cover lg:mb-8"
        >
          <button className="absolute right-0 bottom-0 rounded-full border-2 border-solid border-transparent bg-blue-100 p-2 transition-[border-color] duration-200 group-hover:border-blue-900">
            <UploadProfilePicture />
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
          Guillaume Clerisseau
        </h2>

        <div className="mt-2 lg:mt-3">
          <Subtitle type="4" center={true}>
            Abonné jusqu’au 12 juillet 2022
          </Subtitle>
        </div>
      </div>
      <div className="mt-10 overflow-hidden border-1 border-dark-100 md:rounded-lg">
        <Section
          id="0"
          title="Informations personnelles"
          path="/informations-personnelles"
        />
        <Section id="1" title="Mot de passe" path="/mot-de-passe" />
        <Section
          id="2"
          title="Informations de santé"
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
