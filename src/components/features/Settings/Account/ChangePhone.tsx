import React, {useState} from 'react';
import {Input} from "react-daisyui";
import {Button, Modal} from "@/lib/daisyUi";
import {Form, Formik, FormikHelpers} from "formik";
import TextField from "@/components/shared/Forms/TextField/TextField";
import * as Yup from "yup";

interface PhoneValues {
  phone: string;
}

interface PhoneConfirmValues {
  phone: string;
  code: string;
}

const ChangePhone = () => {
  const [visible, setVisible] = useState<boolean>(false)
  const [confirmForm, setConfirmForm] = useState<boolean>(true)
  const [phone, setPhone] = useState<string>('')

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
      phone: ''
    },
    validationSchema: Yup.object().shape({
      phone: Yup.string().required()
    }),
    onSubmit: (values: PhoneValues, action: FormikHelpers<PhoneValues>) => {
      console.log(values)
      setConfirmForm(false)
      setPhone(values.phone)
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
      email: Yup.string().email().required()
    }),
    onSubmit: (values: PhoneConfirmValues, action: FormikHelpers<PhoneConfirmValues>) => {
      console.log(values)
    }
  }

  return (
    <div className="flex flex-1 gap-x-4 py-2 items-end">
      <div className="w-full">
        <label className="label">
          <span className="label-text">Телефон номер</span>
          <span className="label-text-alt"/>
        </label>
        <Input value="+996 (224) 95-54-54" className="w-full" readOnly/>
      </div>

      <div>
        <Button color="warning" className="normal-case" onClick={toggle}>Сменить почту</Button>

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
