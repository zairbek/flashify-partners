import React from 'react';
import {Form, Formik, FormikErrors, FormikHelpers} from "formik";
import TextField from "@/components/shared/Forms/TextField/TextField";
import {Button} from "@/lib/daisyUi";
import * as Yup from "yup";
import {clear} from "@/lib/formatters/Number";
import {instance} from "@/lib/axios/Axios";
import {AxiosError} from "axios";
import {SignInPhoneValidation} from "@/types/auth/SignInPhone";

interface RequestValues {
  phone: string;
}

interface RequestErrorValues {
  phone?: string;
}

interface Props {
  toNextStep(phone: string): void
}

const RequestCode: React.FC<Props> = ({toNextStep}) => {
  const requestForm: {
    initialValues: RequestValues,
    validationSchema: Yup.ObjectSchema<RequestValues>
    onSubmit(values: RequestValues, action: FormikHelpers<RequestValues>): void
  } = {
    initialValues: {
      phone: '',
    },
    validationSchema: Yup.object().shape({
      phone: Yup.string().required()
    }),
    onSubmit: (values, action) => {
      const phone = clear(values.phone)

      instance.post('auth/phone/request', {phone})
        .then(res => {
          toNextStep(values.phone)
        })
        .catch(err => {
          if (err instanceof AxiosError) {
            if (err.response?.status === 422) {
              const error = err.response.data as SignInPhoneValidation

              const formState: FormikErrors<RequestErrorValues> = {
                phone: '',
              }

              if (error.errors.phone) formState.phone = error.errors.phone.join('. ')

              action.setErrors(formState)
            }
          }
        })
    }
  }

  return (
    <Formik
      initialValues={requestForm.initialValues}
      validationSchema={requestForm.validationSchema}
      onSubmit={(values, action) => requestForm.onSubmit(values, action)}
    >
      <Form>
        <div className="flex flex-col gap-y-6">
          <TextField label="Телефон" type="tel" name="phone" mask="+\9\96 (999) 99-99-99" placeholder="+996 (___) __-__-__" autoFocus/>
          <Button color="primary" type="submit" fullWidth>Войти</Button>
        </div>
      </Form>
    </Formik>
  );
};

export default RequestCode;
