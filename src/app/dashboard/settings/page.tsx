'use client'

import React, {useState} from "react";
import {Divider, Button, Modal} from "@/lib/daisyUi";
import TextField from "@/components/shared/Forms/TextField/TextField";
import {Form, Formik, FormikHelpers} from "formik";
import * as Yup from 'yup';
import {Input} from "react-daisyui";
import {ObjectSchema} from "yup";

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

  const formEmail = {

  }


    const [visible, setVisible] = useState<boolean>(false)

  const toggleVisible = () => {
    setVisible(!visible)
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

        <div className="flex flex-1 gap-x-4 py-2 items-end">
          <div className="w-full">
            <label className="label">
              <span className="label-text">Email</span>
              <span className="label-text-alt"/>
            </label>
            <Input value="xaiker007@gmail.com" className="w-full" readOnly/>
          </div>

          <div>
            <Button color="warning" className="normal-case" onClick={toggleVisible}>Сменить почту</Button>
            <Modal open={visible} onClickBackdrop={toggleVisible}>
              <Button
                size="sm"
                shape="circle"
                className="absolute right-2 top-2"
                onClick={toggleVisible}
              >
                ✕
              </Button>
              <Modal.Header className="font-bold">
                Congratulations random Interner user!
              </Modal.Header>

              <Modal.Body>
                You've been selected for a chance to get one year of subscription to
                use Wikipedia for free!
              </Modal.Body>
            </Modal>
          </div>
        </div>


        <div className="flex flex-1 gap-x-4 py-2 items-end">
          <div className="w-full">
            <label className="label">
              <span className="label-text">Номер телефона</span>
              <span className="label-text-alt"/>
            </label>
            <Input value="+996 (772) 11-96-63" className="w-full" readOnly/>
          </div>

          <div>
            <Button color="warning" className="normal-case" onClick={toggleVisible}>Сменить номер</Button>
            <Modal open={visible} onClickBackdrop={toggleVisible}>
              <Button
                size="sm"
                shape="circle"
                className="absolute right-2 top-2"
                onClick={toggleVisible}
              >
                ✕
              </Button>
              <Modal.Header className="font-bold">
                Congratulations random Interner user!
              </Modal.Header>

              <Modal.Body>
                You've been selected for a chance to get one year of subscription to
                use Wikipedia for free!
              </Modal.Body>
            </Modal>
          </div>
        </div>

        </div>

        <div className="flex gap-x-4 py-4 items-end">
          <div>
            <Button color="error" className="normal-case" onClick={toggleVisible}>Запрос на смену пароля</Button>
            <Modal open={visible} onClickBackdrop={toggleVisible}>
              <Button
                size="sm"
                shape="circle"
                className="absolute right-2 top-2"
                onClick={toggleVisible}
              >
                ✕
              </Button>
              <Modal.Header className="font-bold">
                Congratulations random Interner user!
              </Modal.Header>

              <Modal.Body>
                You've been selected for a chance to get one year of subscription to
                use Wikipedia for free!
              </Modal.Body>
            </Modal>
          </div>
        </div>

      </div>
    </>
  )
}
