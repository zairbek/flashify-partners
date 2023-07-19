import React, {useState} from 'react';
import {Form, Formik, FormikErrors, FormikHelpers, FormikValues} from "formik";
import TextField from "@/components/shared/Forms/TextField/TextField";
import {Button} from "@/lib/daisyUi";
import * as Yup from "yup";
import {ObjectSchema} from "yup";
import {instance} from "@/lib/axios/Axios";
import {clear} from "@/lib/formatters/Number";
import {AxiosError} from "axios";
import {SignInPhoneValidation} from "@/types/auth/SignInPhone";
import {SignUpValidation} from "@/types/auth/SignUp";
import {toast} from "react-toastify";
import {signIn} from "next-auth/react";
import {useRouter} from "next/navigation";

interface StepOneProps {
  onNextStep(): void;
}

interface Values {
  firstName: string;
  lastName: string;
  phone: string;
  password: string;
  passwordConfirmation: string;
  code: string;
}

interface RequestErrorValues {
  firstName?: string;
  lastName?: string;
  phone?: string;
  password?: string;
  password_confirmation?: string;
  code?: string;
}

const StepOne: React.FC<StepOneProps> = ({onNextStep}) => {
  const router = useRouter()
  const [showCode, setShowCode] = useState<boolean>(false)

  const initialValues: Values = {
    firstName: '',
    lastName: '',
    phone: '',
    password: '',
    passwordConfirmation: '',
    code: '',
  }

  const registrationSchema: Yup.ObjectSchema<Values> = Yup.object().shape({
    firstName: Yup.string().required(),
    lastName: Yup.string().required(),
    phone: Yup.string().required(),
    password: Yup.string().required(),
    passwordConfirmation: Yup.string().required(),
    code: Yup.string(),
  })

  const onSubmit = (values: Values, action: FormikValues) => {
    const phone = clear(values.phone)

    const formState: FormikErrors<RequestErrorValues> = {
      firstName: '',
      lastName: '',
      phone: '',
      password: '',
      password_confirmation: '',
      code: '',
    }

    if (! showCode) {
      instance.post('/register/request', {phone})
        .then(res => {
          setShowCode(true);
        })
        .catch(err => {
          if (err instanceof AxiosError) {
            if (err.response?.status === 422) {
              const error = err.response.data as SignUpValidation
              if (error.errors.phone) {
                formState.phone = error.errors.phone.join('. ')
                action.setErrors(formState)
              }
            } else {
              toast('что то пошло не так!', {type: 'error'})
            }
          }
        })
    } else {
      const code = clear(values.code)

      signIn('registerCredentials', {
        phone, code,
        firstName: values.firstName,
        lastName: values.lastName,
        password: values.password,
        password_confirmation: values.passwordConfirmation,
        redirect: false
      })
        .then(({error, ok, status, url}) => {
          if (error) {
            const message = JSON.parse(error) as { message: SignUpValidation }

            if (message.message.errors.firstName) formState.firstName = message.message.errors.firstName.join('. ')
            if (message.message.errors.lastName) formState.lastName = message.message.errors.lastName.join('. ')
            if (message.message.errors.phone) formState.phone = message.message.errors.phone.join('. ')
            if (message.message.errors.password) formState.password = message.message.errors.password.join('. ')
            if (message.message.errors.password_confirmation) formState.password_confirmation = message.message.errors.password_confirmation.join('. ')
            if (message.message.errors.code) formState.code = message.message.errors.code.join('. ')

            action.setErrors(formState)
          } else if (ok) {
            const callbackUrl = (new URL(url)).searchParams.get('callbackUrl')
            if (callbackUrl) {
              // router.push(callbackUrl)
            }
          } else {
            // todo: всплывашка
          }
        })


      instance.post('/register/sign-up', {
        phone, code,
        firstName: values.firstName,
        lastName: values.lastName,
        password: values.password,
        password_confirmation: values.passwordConfirmation
      })
        .then(res => {


          console.log(res)

          // onNextStep()
        })
        .catch(err => {
          if (err instanceof AxiosError) {
            if (err.response?.status === 422) {
              const error = err.response.data as SignUpValidation
              if (error.errors.phone) formState.phone = error.errors.phone.join('. ')
              if (error.errors.code) formState.code = error.errors.code.join('. ')
              if (error.errors.firstName) formState.firstName = error.errors.firstName.join('. ')
              if (error.errors.lastName) formState.lastName = error.errors.lastName.join('. ')
              if (error.errors.password) formState.password = error.errors.password.join('. ')
              if (error.errors.password_confirmation) formState.passwordConfirmation = error.errors.password_confirmation.join('. ')
              action.setErrors(formState)
            } else {
              toast('что то пошло не так!', {type: 'error'})
            }
          }
        })
    }

    // onNextStep()
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
            {showCode && <TextField color="primary" label="Код из sms" name="code" required type="tel" mask="999-999" placeholder="___-___" />}
            <Button color="primary" type="submit" fullWidth>Следующий шаг</Button>
          </div>
        </Form>
      </Formik>
    </>
  );
};

export default StepOne;
