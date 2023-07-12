import React, {useState} from 'react';
import {Input} from "react-daisyui";
import {Button, Modal} from "@/lib/daisyUi";
import {Form, Formik, FormikErrors, FormikHelpers} from "formik";
import TextField from "@/components/shared/Forms/TextField/TextField";
import * as Yup from "yup";
import {User} from "@/types/user";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import {toast} from "react-toastify";
import {AxiosError} from "axios";
import {useSession} from "next-auth/react";
import {clear} from "@/lib/formatters/Number";

interface EmailValues {
  email: string|null;
}

interface EmailConfirmValues {
  email: string|null;
  code: string;
}

interface Props {
  user: User
}

const ChangeEmail: React.FC<Props> = ({user}) => {
  const [emailVisible, setEmailVisible] = useState<boolean>(false)
  const [confirmForm, setConfirmForm] = useState<boolean>(true)
  const [email, setEmail] = useState<string|null>(user.email)
  const axiosAuth = useAxiosAuth()
  const {data: session, update} = useSession();

  const toggle = () => {
    setEmail(user.email);
    setEmailVisible(!emailVisible)
    !emailVisible && setConfirmForm(true)
  }

  const emailForm: {
    initialValues: EmailValues,
    validationSchema: Yup.Schema,
    onSubmit(values: EmailValues, action: FormikHelpers<EmailValues>): void
  } = {
    initialValues: {
      email: email
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email().required()
    }),
    onSubmit: (values: EmailValues, action: FormikHelpers<EmailValues>) => {
      axiosAuth.post('/me/email/request', {email: values.email})
        .then(res => {
          setConfirmForm(false)
          setEmail(values.email)
        }).catch(err => {
          if (err instanceof AxiosError) {
            if (err.response?.status === 422) {
              const error = err.response.data
              const formState: FormikErrors<any> = {
                email: '',
              }
              if (error.errors.email) formState.email = error.errors.email.join('. ')
              action.setErrors(formState)
            }
          } else {
            toast('Что то пошло не так!', {type: 'error'})
          }
      })
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
      const code = clear(values.code)
      axiosAuth.post('/me/email/change', {
        email: values.email,
        code: code
      })
        .then(res => {
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
        if (err instanceof AxiosError) {
          if (err.response?.status === 422) {
            const error = err.response.data
            const formState: FormikErrors<any> = {
              email: '',
              code: '',
            }
            if (error.errors.email) formState.email = error.errors.email.join('. ')
            if (error.errors.code) formState.code = error.errors.code.join('. ')
            action.setErrors(formState)
          }
        } else {
          toast('Что то пошло не так!', {type: 'error'})
        }
      })
    }
  }

  return (
    <div className="flex flex-1 gap-x-4 py-2 items-end">
      <div className="w-full">
        <label className="label">
          <span className="label-text">Email</span>
          <span className="label-text-alt"/>
        </label>
        <Input defaultValue={user.email ?? ''} className="w-full" readOnly/>
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
                    <TextField label="Email" name="email" type="email" required autoFocus/>
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
                    <TextField label="Код из письма" name="code" type="tel" mask="999-999" placeholder="___-___" required autoFocus/>
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
