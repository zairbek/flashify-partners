'use client'

import TextField from "@/components/shared/Forms/TextField/TextField";
import {useRouter} from "next/navigation";
import {Button, Link, Divider, Card} from '@/lib/daisyUi'
import {Form, Formik, FormikHelpers} from "formik";
import * as Yup from 'yup';

interface Values {
  phone: string;
}

export default function Auth() {
  const router = useRouter()

  const initialValues = {
    phone: '',
  }

  const validationSchema: Yup.ObjectSchema<Values> = Yup.object().shape({
    phone: Yup.string().required()
  })

  const onSubmit = (values: Values, action: FormikHelpers<Values>) => {
    console.log(values)
  }

  return (
    <>
      <Card compact className="bg-base-100 w-[24rem] p-6 sm:p-10 relative">
        <Card.Body>
          <div className="mb-8 text-center">
            <h1 className="my-3 text-4xl font-bold">Войти</h1>
            <p className="text-sm text-coolGray-400">Войдите в систему для доступа к своему аккаунту</p>
          </div>

          <div className="flex flex-col w-full border-opacity-50">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={(values, action) => onSubmit(values, action)}
            >
              <Form>
                <div className="flex flex-col gap-y-6">
                    <TextField label="Телефон" type="tel" name="phone" mask="+\9\96 (999) 99-99-99" placeholder="+996 (___) __-__-__"/>
                    <Button color="primary" type="submit" fullWidth>Войти</Button>
                </div>
              </Form>
            </Formik>

            <Divider>или</Divider>

            <div className="flex flex-col gap-2 text-sm text-center">
              <Link color="primary" type="button" onClick={() => router.push('/auth/email')}>Войти по почте</Link>
              <Link color="primary" type="button" onClick={() => router.push('/auth/registration')}>Зарегистрироваться</Link>
            </div>
          </div>
        </Card.Body>
      </Card>
    </>
  )
};

