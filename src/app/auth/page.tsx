'use client'

import TextField from "@/components/shared/Forms/TextField/TextField";
import {useRouter} from "next/navigation";
import {Button, Link, Divider, Card} from '@/lib/daisyUi'
import {Form, Formik, FormikErrors, FormikHelpers} from "formik";
import * as Yup from 'yup';
import {useState} from "react";
import {instance} from "@/lib/axios/Axios";
import {clear} from "@/lib/formatters/Number";
import {signIn} from "next-auth/react";
import {SignInPhoneValidation} from "@/types/auth/SignInPhone";
import {AxiosError} from "axios";

interface RequestValues {
  phone: string;
}

interface AuthValues {
  phone: string;
  code: string;
}
interface AuthErrorValues {
  phone?: string;
  code?: string;
}

export default function Auth() {
  const router = useRouter()
  const [confirmationForm, setConfirmationForm] = useState<boolean>(false)
  const [phone, setPhone] = useState<string>('')

  const requestForm: {
    initialValues: RequestValues,
    validationSchema: Yup.ObjectSchema<RequestValues>
    onSubmit(values: RequestValues, action: FormikHelpers<RequestValues>): void
  } = {
    initialValues: {
      phone: '',
    },
    validationSchema: Yup.object().shape({
      phone: Yup.string().required()
    }),
    onSubmit: (values, action) => {
      const phone = clear(values.phone)

      instance.post('auth/phone/request', {phone})
        .then(res => {
          setPhone(values.phone)
          setConfirmationForm(true);
        })
        .catch(err => {
          if (err instanceof AxiosError) {
            if (err.response?.status === 422) {
              const error = err.response.data as SignInPhoneValidation

              const formState: FormikErrors<AuthErrorValues> = {
                phone: null,
                code: null,
              }

              if (error.errors.phone) formState.phone = error.errors.phone.join('. ')
              if (error.errors.code) formState.code = error.errors.code.join('. ')

              action.setErrors(formState)
            }
          }
        })
    }
  }


  const authForm: {
    initialValues: AuthValues,
    validationSchema: Yup.ObjectSchema<AuthValues>
    onSubmit(values: AuthValues, action: FormikHelpers<AuthValues>): void
  } = {
    initialValues: {
      phone,
      code: ''
    },
    validationSchema: Yup.object().shape({
      phone: Yup.string().required(),
      code: Yup.string().required()
    }),
    onSubmit: (values, action) => {
      const phone = clear(values.phone)
      const code = clear(values.code)

      signIn('phoneCredentials', {phone, code, redirect: false})
        .then(({error, ok, status, url}) => {
        if (error) {
          const message = JSON.parse(error) as { message: SignInPhoneValidation }
          const formState: FormikErrors<AuthErrorValues> = {
            phone: null,
            code: null,
          }

          if (message.message.errors.phone) formState.phone = message.message.errors.phone.join('. ')
          if (message.message.errors.code) formState.code = message.message.errors.code.join('. ')

          action.setErrors(formState)
        }
        if (ok) {
          const callbackUrl = (new URL(url)).searchParams.get('callbackUrl')
          if (callbackUrl) {
            router.push(callbackUrl)
          }
        } else {
          // todo: всплывашка
        }
      })
    }
  }

  return (
    <>
      <Card compact className="bg-base-100 w-[24rem] p-6 sm:p-10 relative">
        <Card.Body>
          <div className="mb-8 text-center">
            <h1 className="my-3 text-4xl font-bold">Войти</h1>
            <p className="text-sm text-coolGray-400">Войдите в систему для доступа к своему аккаунту</p>
          </div>

          <div className="flex flex-col w-full border-opacity-50">

            {!confirmationForm
            ? <Formik
                initialValues={requestForm.initialValues}
                validationSchema={requestForm.validationSchema}
                onSubmit={(values, action) => requestForm.onSubmit(values, action)}
              >
                <Form>
                  <div className="flex flex-col gap-y-6">
                    <TextField label="Телефон" type="tel" name="phone" mask="+\9\96 (999) 99-99-99" placeholder="+996 (___) __-__-__"/>
                    <Button color="primary" type="submit" fullWidth>Войти</Button>
                  </div>
                </Form>
              </Formik>
            :
              <div>
              <Formik
                initialValues={authForm.initialValues}
                validationSchema={authForm.validationSchema}
                onSubmit={(values, action) => authForm.onSubmit(values, action)}
              >
                <Form>
                  <div className="flex flex-col gap-y-6">
                    <TextField label="Телефон" type="tel" name="phone" mask="+\9\96 (999) 99-99-99" placeholder="+996 (___) __-__-__" readOnly/>
                    <TextField label="Код из смс" type="tel" name="code" mask="999-999" placeholder="___-___" autoFocus/>
                    <Button color="primary" type="submit" fullWidth>Войти</Button>
                  </div>
                </Form>
              </Formik>
              </div>
            }




            <Divider>или</Divider>

            <div className="flex flex-col gap-2 text-sm text-center">
              <Link color="primary" type="button" onClick={() => router.push('/auth/email')}>Войти по почте</Link>
              <Link color="primary" type="button" onClick={() => router.push('/auth/registration')}>Зарегистрироваться</Link>
            </div>
          </div>
        </Card.Body>
      </Card>
    </>
  )
};

