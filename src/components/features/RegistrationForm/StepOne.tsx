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
  phone: string;
  code: string;
}

interface RequestErrorValues {
  phone?: string;
  code?: string;
}

const StepOne: React.FC<StepOneProps> = ({onNextStep}) => {
  const router = useRouter()
  const [showCode, setShowCode] = useState<boolean>(false)

  const initialValues: Values = {
    phone: '',
    code: '',
  }

  const registrationSchema: Yup.ObjectSchema<Values> = Yup.object().shape({
    phone: Yup.string().required(),
    code: Yup.string(),
  })

  const onSubmit = (values: Values, action: FormikValues) => {
    const phone = clear(values.phone)

    const formState: FormikErrors<RequestErrorValues> = {
      phone: '',
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

      signIn('registerCredentials', {phone, code, redirect: false})
        .then(({error, ok, status, url}) => {
          if (error) {
            const message = JSON.parse(error) as { message: SignUpValidation }

            if (message.message.errors.phone) formState.phone = message.message.errors.phone.join('. ')
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



      //
      // instance.post('/register/sign-up', {phone, code,})
      //   .then(res => {
      //     console.log(res)
      //     // onNextStep()
      //   })
      //   .catch(err => {
      //     if (err instanceof AxiosError) {
      //       if (err.response?.status === 422) {
      //         const error = err.response.data as SignUpValidation
      //         if (error.errors.phone) formState.phone = error.errors.phone.join('. ')
      //         if (error.errors.code) formState.code = error.errors.code.join('. ')
      //         action.setErrors(formState)
      //       } else {
      //         toast('что то пошло не так!', {type: 'error'})
      //       }
      //     }
      //   })



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
            <TextField color="primary" label="Телефон номер" name="phone" required type="tel" mask="+\9\96 (999) 99-99-99" placeholder="+996 (___) __-__-__" />
            {showCode && <TextField color="primary" label="Код из sms" name="code" required type="tel" mask="999-999" placeholder="___-___" />}
            <Button color="primary" type="submit" fullWidth>Следующий шаг</Button>
          </div>
        </Form>
      </Formik>
    </>
  );
};

export default StepOne;
