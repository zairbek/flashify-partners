import React, {useState} from 'react';
import {Input} from "react-daisyui";
import {Button, Modal} from "@/lib/daisyUi";
import {Form, Formik, FormikHelpers} from "formik";
import TextField from "@/components/shared/Forms/TextField/TextField";
import * as Yup from "yup";

interface PhoneValues {
  oldPassword: string;
  password: string;
  passwordConfirmation: string;
}

const ChangePhone = () => {
  const [visible, setVisible] = useState<boolean>(false)

  const toggle = () => {
    setVisible(!visible)
  }

  const form: {
    initialValues: PhoneValues,
    validationSchema: Yup.Schema,
    onSubmit(values: PhoneValues, action: FormikHelpers<PhoneValues>): void
  } = {
    initialValues: {
      oldPassword: '',
      password: '',
      passwordConfirmation: '',
    },
    validationSchema: Yup.object().shape({
      oldPassword: Yup.string().required(),
      password: Yup.string().required(),
      passwordConfirmation: Yup.string().required(),
    }),
    onSubmit: (values: PhoneValues, action: FormikHelpers<PhoneValues>) => {
      console.log(values)
    }
  }

  return (
    <div className="flex flex-1 gap-x-4 py-2 items-end">
      <div>
        <Button color="error" className="normal-case" onClick={toggle}>Запрос на смену пароля</Button>
        <Modal open={visible} onClickBackdrop={toggle}>
          <Button size="sm" shape="circle" className="absolute right-2 top-2" onClick={toggle}>✕</Button>
          <Modal.Header className="font-bold">
            Смена пароль
          </Modal.Header>

          <Modal.Body>
            <Formik
              initialValues={form.initialValues}
              validationSchema={form.validationSchema}
              onSubmit={form.onSubmit}
            >
              <Form>
                <TextField label="Ваш текущий пароль" name="oldPassword" type="password" />
                <TextField label="Новый пароль" name="password" type="password" />
                <TextField label="Повторите новый пароль" name="passwordConfirmation" type="password" />
                <Button type="submit" color="primary" className="normal-case mt-4">Сменить</Button>
              </Form>
            </Formik>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default ChangePhone;
