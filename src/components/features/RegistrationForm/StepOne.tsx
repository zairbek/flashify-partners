import React from 'react';
import {Form, Formik, FormikHelpers, FormikValues} from "formik";
import TextField from "@/components/shared/Forms/TextField/TextField";
import {Button} from "@/lib/daisyUi";
import * as Yup from "yup";
import {ObjectSchema} from "yup";

interface StepOneProps {
  onNextStep(): void;
}

interface Values {
  firstName: string;
  lastName: string;
  phone: string;
  password: string;
  passwordConfirmation: string;
}

const StepOne: React.FC<StepOneProps> = ({onNextStep}) => {

  const initialValues: Values = {
    firstName: '',
    lastName: '',
    phone: '',
    password: '',
    passwordConfirmation: '',
  }

  const registrationSchema: ObjectSchema<Values> = Yup.object().shape({
    firstName: Yup.string().required(),
    lastName: Yup.string().required(),
    phone: Yup.string().required(),
    password: Yup.string().required(),
    passwordConfirmation: Yup.string().required(),
  })

  const onSubmit = (values: Values, action: FormikValues) => {
    console.log(values)
    onNextStep()
  }

  return (
    <>
      <div className="mb-8 text-center">
        <h1 className="my-3 text-4xl font-bold">Создать аккаунт</h1>
        <p className="text-sm text-coolGray-400">Аккаунт нужен для дальнейший работы</p>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={registrationSchema}
        onSubmit={(values: Values, action: FormikHelpers<Values>) => onSubmit(values, action)}
      >
        <Form>
          <div className="flex flex-col gap-y-3">
            <TextField color="primary" label="Имя" name="firstName" required />
            <TextField color="primary" label="Фамилия" name="lastName" required />
            <TextField color="primary" label="Телефон номер" name="phone" required type="tel" mask="+\9\96 (999) 99-99-99" placeholder="+996 (___) __-__-__" />
            <TextField color="primary" label="Пароль" name="password" type="password" required />
            <TextField color="primary" label="Повторите пароль" name="passwordConfirmation" type="password" required />
            <Button color="primary" type="submit" fullWidth>Следующий шаг</Button>
          </div>
        </Form>
      </Formik>
    </>
  );
};

export default StepOne;
