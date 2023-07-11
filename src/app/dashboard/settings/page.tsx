'use client'

import React from "react";
import {Divider, Button} from "@/lib/daisyUi";
import TextField from "@/components/shared/Forms/TextField/TextField";
import {Form, Formik, FormikErrors, FormikHelpers} from "formik";
import * as Yup from 'yup';
import {ObjectSchema} from "yup";
import ChangeEmail from "@/components/features/Settings/Account/ChangeEmail";
import ChangePhone from "@/components/features/Settings/Account/ChangePhone";
import ChangePassword from "@/components/features/Settings/Account/ChangePassword";
import {useSession} from "next-auth/react";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import ThreeDotsSkeleton from "@/components/features/Loaders/ThreeDotsSkeleton/ThreeDotsSkeleton";
import {AxiosError} from "axios";
import {UpdateMeValidation} from "@/types/user/Me";
import {toast} from "react-toastify";

interface Values {
  firstName?: string;
  lastName?: string;
}

interface FormStateValues {
  firstName: string;
  lastName: string;
}

export default function Settings() {
  const {data: session, update, status} = useSession()
  const axiosAuth = useAxiosAuth();

  if (status === 'loading') {
    return (<ThreeDotsSkeleton/>);
  }

  const formNames: {
    initialValues: Values,
    validationSchema: ObjectSchema<Values>,
    onSubmit(values: Values, action: FormikHelpers<Values>): any
  } = {
    initialValues: {
      firstName: session?.user?.name.firstName,
      lastName: session?.user?.name.lastName,
    },
    validationSchema: Yup.object().shape({
      firstName: Yup.string().required(),
      lastName: Yup.string().required(),
    }),
    onSubmit: (values: Values, action: FormikHelpers<Values>) => {
      axiosAuth.post('me', {
        firstName: values.firstName,
        lastName: values.lastName,
      }).then(res => {
        axiosAuth.get('me').then(res => {
          const token = session?.user.token;
          update({
            ...session,
            user: {
              ...res.data,
              token: token
            }
          }).then(r => {})
        })
      }).catch(err => {
        if (err instanceof AxiosError && err.response?.status === 422) {
          const error = err.response.data as UpdateMeValidation
          const formState: FormikErrors<FormStateValues> = {firstName: '', lastName: '',}
          if (error.errors.firstName) formState.firstName = error.errors.firstName.join('. ')
          if (error.errors.lastName) formState.lastName = error.errors.lastName.join('. ')
          action.setErrors(formState)
        } else {
          toast('что то пошло не так', {type: 'error'})
        }
      })
    }
  }

  return (
    <>
      <h1 className="text-lg font-bold p-2">Настройки аккаунта</h1>
      <Divider className="my-0"/>

      <div>

        <Formik
          initialValues={formNames.initialValues}
          validationSchema={formNames.validationSchema}
          onSubmit={formNames.onSubmit}
        >
          <Form>
            <div className="flex gap-x-4 items-center">
              <TextField label="Имя" name="firstName" required/>
              <TextField label="Фамилия" name="lastName" required/>
            </div>
            <Button color="primary" className="mt-2 normal-case">Сохранить</Button>
          </Form>
        </Formik>


        <h2 className="font-bold p-2 pt-6">Данные для доступа</h2>
        <Divider className="my-0"/>

        <div className="flex gap-x-4">
          <ChangeEmail/>
          <ChangePhone/>
        </div>

        <ChangePassword/>
      </div>
    </>
  )
}
