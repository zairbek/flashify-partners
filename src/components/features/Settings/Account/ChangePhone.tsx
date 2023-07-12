import React, {useState} from 'react';
import {Input} from "react-daisyui";
import {Button, Modal} from "@/lib/daisyUi";
import {Form, Formik, FormikErrors, FormikHelpers} from "formik";
import TextField from "@/components/shared/Forms/TextField/TextField";
import * as Yup from "yup";
import {User} from "@/types/user";
import InputMask from "react-input-mask";
import {AxiosError} from "axios";
import {toast} from "react-toastify";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import {clear} from "@/lib/formatters/Number";
import {useSession} from "next-auth/react";

interface PhoneValues {
  phone: string;
}

interface PhoneConfirmValues {
  phone: string;
  code: string;
}

interface Props {
  user: User
}

const ChangePhone: React.FC<Props> = ({user}) => {
  const [visible, setVisible] = useState<boolean>(false)
  const [confirmForm, setConfirmForm] = useState<boolean>(true)
  const [phone, setPhone] = useState<string>(user.phone?.number || '')
  const axiosAuth = useAxiosAuth();
  const {data: session, update} = useSession();

  const toggle = () => {
    setVisible(!visible)
    !visible && setConfirmForm(true)
  }

  const phoneForm: {
    initialValues: PhoneValues,
    validationSchema: Yup.Schema,
    onSubmit(values: PhoneValues, action: FormikHelpers<PhoneValues>): void
  } = {
    initialValues: {
      phone: phone
    },
    validationSchema: Yup.object().shape({
      phone: Yup.string().required()
    }),
    onSubmit: (values: PhoneValues, action: FormikHelpers<PhoneValues>) => {
      const phone = clear(values.phone)
      axiosAuth.post('/me/phone/request', {phone: phone})
        .then(res => {
          setConfirmForm(false)
          setPhone(values.phone)
        }).catch(err => {
        if (err instanceof AxiosError) {
          if (err.response?.status === 422) {
            const error = err.response.data
            const formState: FormikErrors<any> = {
              phone: '',
            }
            if (error.errors.phone) formState.phone = error.errors.phone.join('. ')
            action.setErrors(formState)
          }
        } else {
          toast('Что то пошло не так!', {type: 'error'})
          console.log(err)
        }
      })
    }
  }

  const phoneConfirmForm: {
    initialValues: PhoneConfirmValues,
    validationSchema: Yup.Schema,
    onSubmit(values: PhoneConfirmValues, action: FormikHelpers<PhoneConfirmValues>): void
  } = {
    initialValues: {
      phone: phone,
      code: ''
    },
    validationSchema: Yup.object().shape({
      phone: Yup.string().required(),
      code: Yup.string().required(),
    }),
    onSubmit: (values: PhoneConfirmValues, action: FormikHelpers<PhoneConfirmValues>) => {
      const phone = clear(values.phone)
      const code = clear(values.code)
      axiosAuth.post('/me/phone/change', {
        phone: phone,
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
              phone: '',
              code: '',
            }
            if (error.errors.phone) formState.phone = error.errors.phone.join('. ')
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
          <span className="label-text">Телефон номер</span>
          <span className="label-text-alt"/>
        </label>
        <InputMask className="w-full" mask="+\9\96 (999) 99-99-99" value={phone} readOnly>
          <Input value={phone} className="w-full" readOnly/>
        </InputMask>
      </div>

      <div>
        <Button color="warning" className="normal-case" onClick={toggle}>Сменить номер</Button>

        <Modal open={visible} onClickBackdrop={toggle}>
          <Button size="sm" shape="circle" className="absolute right-2 top-2" onClick={toggle}>✕</Button>
          <Modal.Header className="font-bold">
            Смена Email
          </Modal.Header>

          <Modal.Body>

            {confirmForm
              ?
                <Formik
                  initialValues={phoneForm.initialValues}
                  validationSchema={phoneForm.validationSchema}
                  onSubmit={phoneForm.onSubmit}
                >
                  <Form>
                    <TextField label="Номер телефона" name="phone" type="tel" mask="+\9\96 (999) 99-99-99" placeholder="+996 (___) __-__-__" required/>
                    <Button type="submit" color="primary" className="normal-case mt-4">Отправить</Button>
                  </Form>
                </Formik>
              :
                <Formik
                  initialValues={phoneConfirmForm.initialValues}
                  validationSchema={phoneConfirmForm.validationSchema}
                  onSubmit={phoneConfirmForm.onSubmit}
                >
                  <Form className="flex flex-col gap-y-4">
                    <TextField label="Номер телефона" name="phone" type="tel" mask="+\9\96 (999) 99-99-99" placeholder="+996 (___) __-__-__" readOnly required/>
                    <TextField label="Код из смс" name="code" type="tel" mask="999-999" placeholder="___-___" required/>
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

export default ChangePhone;
