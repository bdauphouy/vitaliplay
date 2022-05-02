import CheckoutLayout from '@/components/layouts/CheckoutLayout'
import Title from '@/components/utils/Title'
import Radio from '@/components/utils/Radio'
import { useFormik } from 'formik'
import Cta from '@/components/utils/Cta'
import { useEffect, useState, useContext } from 'react'
import Input from '@/components/utils/Input'
import Dropdown from '@/components/utils/Dropdown'
import { useRouter } from 'next/router'
import useButtonSize from '@/hooks/useButtonSize'
import {
  StartOfferSchema,
  StartLoginSchema,
  StartSignupSchema,
} from '@/schemas/checkout/StartSchemas'
import { LinksContext } from '@/contexts/LinksContext'
import { AuthContext } from '@/contexts/AuthContext'

const CheckoutStart = () => {
  const [civility, setCivility] = useState('M')

  const [store, setStore] = useState()

  const { isAuth } = useContext(AuthContext)

  useEffect(() => {
    setStore(
      JSON.parse(window.localStorage.getItem('vitaliplay.checkout.store'))
    )
  }, [])

  useEffect(() => {
    if (isAuth) {
      router.push(getPage(checkoutPages, 'pageName', 'Informations').path)
    }
  }, [isAuth])

  const formatDate = (date) => {
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')

    return `${year}-${month}-${day}`
  }

  const [validationSchema, setValidationSchema] = useState()

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      account: '',
      email: '',
      password: '',
      lastName: '',
      firstName: '',
      address: '',
      zipCode: '',
      birthday: formatDate(new Date()),
      phoneNumber: '',
      confirmPassword: '',
      confirmEmail: '',
    },
    validationSchema,
    onSubmit: (values) => {
      const entries = Object.entries(values)
      const filtered = entries.filter(([key, value]) => value !== '')
      if (!disabled) {
        window.localStorage.setItem(
          'vitaliplay.checkout.store',
          JSON.stringify({ ...store, ...Object.fromEntries(filtered) })
        )
        router.push(getPage(checkoutPages, 'pageName', 'Informations').path)
      }
    },
  })

  useEffect(() => {
    formik.validationSchema = validationSchema
  }, [validationSchema])

  useEffect(() => {
    switch (formik.values.account) {
      case 'already':
        setValidationSchema(StartLoginSchema)
        setDisabled(!(formik.values.email && formik.values.password))
        break
      case 'create':
        setValidationSchema(StartSignupSchema)
        setDisabled(
          !(
            civility &&
            formik.values.email &&
            formik.values.password &&
            formik.values.lastName &&
            formik.values.firstName &&
            formik.values.address &&
            formik.values.zipCode &&
            formik.values.birthday &&
            formik.values.phoneNumber &&
            formik.values.confirmPassword
          )
        )
        break
      case 'offer':
        setValidationSchema(StartOfferSchema)
        setDisabled(
          !(
            civility &&
            formik.values.email &&
            formik.values.lastName &&
            formik.values.firstName &&
            formik.values.confirmEmail
          )
        )
        break
      default:
        setDisabled(true)
        break
    }
  }, [formik.values])

  useEffect(() => {
    Object.keys(formik.initialValues).map((key) => {
      if (key !== 'account') {
        formik.values[key] = ''
        delete formik.errors[key]
        formik.touched[key] = ''
      }
    })
  }, [formik.values.account])

  const router = useRouter()

  const { getPage, checkoutPages } = useContext(LinksContext)

  const buttonSize = useButtonSize()

  const [disabled, setDisabled] = useState(true)

  return (
    <div className="mt-10 px-6 md:px-24 lg:mt-0 lg:h-[calc(100vh)] lg:overflow-auto lg:pt-40">
      <Title type="3">Avez-vous un compte ?</Title>
      <form onSubmit={formik.handleSubmit} className="lg:pb-20">
        <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-4 xl:grid-cols-2">
          <Radio
            id="already"
            name="account"
            checked={formik.values.account === 'already'}
            onChange={formik.handleChange}
          >
            Je possède déjà un compte
          </Radio>
          <Radio
            id="create"
            name="account"
            checked={formik.values.account === 'create'}
            onChange={formik.handleChange}
          >
            Je créer mon compte
          </Radio>

          <Radio
            id="offer"
            name="account"
            checked={formik.values.account === 'offer'}
            onChange={formik.handleChange}
          >
            Offrir un abonnement
          </Radio>
        </div>
        <div className="mt-7">
          {formik.values.account === 'already' ? (
            <div className="flex flex-col gap-3 lg:w-4/5 lg:gap-5">
              <Input
                label="Email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && formik.errors.email}
              />
              <Input
                label="Mot de passe"
                type="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.touched.password && formik.errors.password}
              />
            </div>
          ) : formik.values.account === 'create' ? (
            <div className="lg:grid-area-signup flex flex-col gap-4 lg:gap-5 2xl:grid">
              <div className="self-start" style={{ gridArea: 'a' }}>
                <Dropdown
                  options={['M', 'Mme']}
                  label="Civilité"
                  defaultOption={civility}
                  getOption={setCivility}
                />
              </div>
              <div style={{ gridArea: 'b' }}>
                <Input
                  label="Nom"
                  name="lastName"
                  onChange={formik.handleChange}
                  value={formik.values.lastName}
                  error={formik.touched.lastName && formik.errors.lastName}
                />
              </div>
              <div style={{ gridArea: 'c' }}>
                <Input
                  label="Prénom"
                  name="firstName"
                  onChange={formik.handleChange}
                  value={formik.values.firstName}
                  error={formik.touched.firstName && formik.errors.firstName}
                />
              </div>
              <div style={{ gridArea: 'd' }}>
                <Input
                  label="Adresse"
                  name="address"
                  onChange={formik.handleChange}
                  value={formik.values.address}
                  error={formik.touched.address && formik.errors.address}
                />
              </div>
              <div className="flex gap-4" style={{ gridArea: 'e' }}>
                <div className="flex-1">
                  <Input
                    label="Code Postal"
                    name="zipCode"
                    onChange={formik.handleChange}
                    value={formik.values.zipCode}
                    error={formik.touched.zipCode && formik.errors.zipCode}
                  />
                </div>
                <div className="flex-1">
                  <Input
                    label="Date de naissance"
                    name="birthday"
                    type="date"
                    onChange={formik.handleChange}
                    value={formik.values.birthday}
                    error={formik.touched.birthday && formik.errors.birthday}
                  />
                </div>
              </div>
              <div style={{ gridArea: 'f' }}>
                <Input
                  label="Email"
                  name="email"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  error={formik.touched.email && formik.errors.email}
                />
              </div>
              <div style={{ gridArea: 'g' }}>
                <Input
                  label="Téléphone"
                  name="phoneNumber"
                  onChange={formik.handleChange}
                  value={formik.values.phoneNumber}
                  prefix="(+ 33)"
                  error={
                    formik.touched.phoneNumber && formik.errors.phoneNumber
                  }
                />
              </div>
              <div style={{ gridArea: 'h' }}>
                <Input
                  label="Mot de passe"
                  name="password"
                  type="password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  error={formik.touched.password && formik.errors.password}
                />
              </div>
              <div style={{ gridArea: 'i' }}>
                <Input
                  label="Confirmation mot de passe"
                  name="confirmPassword"
                  type="password"
                  onChange={formik.handleChange}
                  value={formik.values.confirmPassword}
                  error={
                    formik.touched.confirmPassword &&
                    formik.errors.confirmPassword
                  }
                />
              </div>
            </div>
          ) : (
            formik.values.account === 'offer' && (
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-4 lg:flex-row">
                  <Dropdown
                    options={['M', 'Mme']}
                    label="Civilité"
                    defaultOption={civility}
                    getOption={setCivility}
                  />
                  <div className="flex-1">
                    <Input
                      label="Nom"
                      name="lastName"
                      onChange={formik.handleChange}
                      value={formik.values.lastName}
                      error={formik.touched.lastName && formik.errors.lastName}
                    />
                  </div>
                  <div className="flex-1">
                    <Input
                      label="Prénom"
                      name="firstName"
                      onChange={formik.handleChange}
                      value={formik.values.firstName}
                      error={
                        formik.touched.firstName && formik.errors.firstName
                      }
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-4 xl:flex-row">
                  <div className="flex-1">
                    <Input
                      label="Email"
                      name="email"
                      onChange={formik.handleChange}
                      value={formik.values.email}
                      error={formik.touched.email && formik.errors.email}
                    />
                  </div>
                  <div className="flex-1">
                    <Input
                      label="Confirmer l'email"
                      name="confirmEmail"
                      onChange={formik.handleChange}
                      value={formik.values.confirmEmail}
                      error={
                        formik.touched.confirmEmail &&
                        formik.errors.confirmEmail
                      }
                    />
                  </div>
                </div>
              </div>
            )
          )}
        </div>
        <div className="mt-8 lg:mt-12">
          <Cta
            buttonType="submit"
            type={disabled ? 'disabled' : 'primary'}
            size={buttonSize}
          >
            Suivant
          </Cta>
        </div>
      </form>
    </div>
  )
}

CheckoutStart.Layout = CheckoutLayout

export default CheckoutStart
