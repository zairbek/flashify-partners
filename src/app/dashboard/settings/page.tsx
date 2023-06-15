'use client'

import React, {useState} from "react";
import {Divider, Button, Modal} from "@/lib/daisyUi";
import TextField from "@/components/shared/Forms/TextField/TextField";
import {Form, Formik, FormikHelpers} from "formik";
import * as Yup from 'yup';
import {Input} from "react-daisyui";
import {ObjectSchema} from "yup";
import ChangeEmail from "@/components/features/Settings/Account/ChangeEmail";
import ChangePhone from "@/components/features/Settings/Account/ChangePhone";
import ChangePassword from "@/components/features/Settings/Account/ChangePassword";

interface Values {
  firstName: string;
  lastName: string;
}


export default function Settings() {
  const formNames: {
    initialValues: Values,
    validationSchema: ObjectSchema<Values>,
    onSubmit(values: Values, action: FormikHelpers<Values>): any
  } = {
    initialValues: {
      firstName: '',
      lastName: '',
    },
    validationSchema: Yup.object().shape({
      firstName: Yup.string().required(),
      lastName: Yup.string().required(),
    }),
    onSubmit: (values: Values, action: FormikHelpers<Values>) => {

    }
  }

    const [phoneVisible, setPhoneVisible] = useState<boolean>(false)
    const [passwordVisible, setPasswordVisible] = useState<boolean>(false)

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
