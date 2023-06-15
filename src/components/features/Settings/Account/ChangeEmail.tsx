import React, {useState} from 'react';
import {Input} from "react-daisyui";
import {Button, Modal} from "@/lib/daisyUi";
import {Form, Formik, FormikHelpers} from "formik";
import TextField from "@/components/shared/Forms/TextField/TextField";
import * as Yup from "yup";

interface EmailValues {
  email: string;
}

interface EmailConfirmValues {
  email: string;
  code: string;
}

const ChangeEmail = () => {
  const [emailVisible, setEmailVisible] = useState<boolean>(false)
  const [confirmForm, setConfirmForm] = useState<boolean>(true)
  const [email, setEmail] = useState<string>('')

  const toggle = () => {
    setEmailVisible(!emailVisible)
    !emailVisible && setConfirmForm(true)
  }

  const emailForm: {
    initialValues: EmailValues,
    validationSchema: Yup.Schema,
    onSubmit(values: EmailValues, action: FormikHelpers<EmailValues>): void
  } = {
    initialValues: {
      email: 'xaiker007@gmail.com'
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email().required()
    }),
    onSubmit: (values: EmailValues, action: FormikHelpers<EmailValues>) => {
      console.log(values)
      setConfirmForm(false)
      setEmail(values.email)
    }
  }

  const emailConfirmForm: {
    initialValues: EmailConfirmValues,
    validationSchema: Yup.Schema,
    onSubmit(values: EmailConfirmValues, action: FormikHelpers<EmailConfirmValues>): void
  } = {
    initialValues: {
      email: email,
      code: ''
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email().required()
    }),
    onSubmit: (values: EmailConfirmValues, action: FormikHelpers<EmailConfirmValues>) => {
      console.log(values)
    }
  }

  return (
    <div className="flex flex-1 gap-x-4 py-2 items-end">
      <div className="w-full">
        <label className="label">
          <span className="label-text">Email</span>
          <span className="label-text-alt"/>
        </label>
        <Input value="xaiker007@gmail.com" className="w-full" readOnly/>
      </div>

      <div>
        <Button color="warning" className="normal-case" onClick={toggle}>Сменить почту</Button>

        <Modal open={emailVisible} onClickBackdrop={toggle}>
          <Button size="sm" shape="circle" className="absolute right-2 top-2" onClick={toggle}>✕</Button>
          <Modal.Header className="font-bold">
            Смена Email
          </Modal.Header>

          <Modal.Body>

            {confirmForm
              ?
                <Formik
                  initialValues={emailForm.initialValues}
                  validationSchema={emailForm.validationSchema}
                  onSubmit={emailForm.onSubmit}
                >
                  <Form>
                    <TextField label="Email" name="email" type="email" required/>
                    <Button type="submit" color="primary" className="normal-case mt-4">Отправить</Button>
                  </Form>
                </Formik>
              :
                <Formik
                  initialValues={emailConfirmForm.initialValues}
                  validationSchema={emailConfirmForm.validationSchema}
                  onSubmit={emailConfirmForm.onSubmit}
                >
                  <Form className="flex flex-col gap-y-4">
                    <TextField label="Email" name="email" type="email" readOnly required/>
                    <TextField label="Код из письма" name="code" type="tel" mask="999-999" placeholder="___-___" required/>
                    <Button type="submit" color="primary" className="normal-case">Отправить</Button>
                  </Form>
                </Formik>
            }

          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default ChangeEmail;
