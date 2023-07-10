import React from 'react';
import {Form, Formik, FormikErrors, FormikHelpers} from "formik";
import TextField from "@/components/shared/Forms/TextField/TextField";
import {Button} from "@/lib/daisyUi";
import * as Yup from "yup";
import {clear} from "@/lib/formatters/Number";
import {signIn} from "next-auth/react";
import {SignInPhoneValidation} from "@/types/auth/SignInPhone";
import {useRouter} from "next/navigation";

interface AuthValues {
  phone: string;
  code: string;
}

interface AuthErrorValues {
  phone?: string;
  code?: string;
}

interface Props {
  phone: string
}

const SignIn: React.FC<Props> = ({phone}) => {
  const router = useRouter()

  const authForm: {
    initialValues: AuthValues,
    validationSchema: Yup.ObjectSchema<AuthValues>
    onSubmit(values: AuthValues, action: FormikHelpers<AuthValues>): void
  } = {
    initialValues: {
      phone,
      code: ''
    },
    validationSchema: Yup.object().shape({
      phone: Yup.string().required(),
      code: Yup.string().required()
    }),
    onSubmit: (values, action) => {
      const phone = clear(values.phone)
      const code = clear(values.code)

      signIn('phoneCredentials', {phone, code, redirect: false})
        .then(({error, ok, status, url}) => {
          if (error) {
            const message = JSON.parse(error) as { message: SignInPhoneValidation }
            const formState: FormikErrors<AuthErrorValues> = {
              phone: '',
              code: '',
            }

            if (message.message.errors.phone) formState.phone = message.message.errors.phone.join('. ')
            if (message.message.errors.code) formState.code = message.message.errors.code.join('. ')

            action.setErrors(formState)
          } else if (ok) {
            const callbackUrl = (new URL(url)).searchParams.get('callbackUrl')
            if (callbackUrl) {
              router.push(callbackUrl)
            }
          } else {
            // todo: всплывашка
          }
        })
    }
  }

    return (
    <div>
      <Formik
        initialValues={authForm.initialValues}
        validationSchema={authForm.validationSchema}
        onSubmit={(values, action) => authForm.onSubmit(values, action)}
      >
        <Form>
          <div className="flex flex-col gap-y-6">
            <TextField label="Телефон" type="tel" name="phone" mask="+\9\96 (999) 99-99-99" placeholder="+996 (___) __-__-__" readOnly/>
            <TextField label="Код из смс" type="tel" name="code" mask="999-999" placeholder="___-___" autoFocus/>
            <Button color="primary" type="submit" fullWidth>Войти</Button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default SignIn;
