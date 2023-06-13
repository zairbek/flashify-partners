import React from 'react';
import {Field, Form, Formik, FormikHelpers, FormikValues} from "formik";
import TextField from "@/components/shared/Forms/TextField/TextField";
import {Button} from "@/lib/daisyUi";
import * as Yup from "yup";
import {ObjectSchema} from "yup";

interface Values {
  lastName: string;
  firstName: string;
  middleName: string;
  companyName: string;
  site: string;
  contactNumber: string;
  registrationAddress: string;
  zip: string;
}

const StepThree = () => {

  const initialValues: Values = {
    lastName: '',
    firstName: '',
    middleName: '',
    companyName: '',
    site: '',
    contactNumber: '',
    registrationAddress:'',
    zip:''
  }

  const registrationSchema: ObjectSchema<any> = Yup.object().shape({
    lastName: Yup.string().required(),
    firstName: Yup.string().required(),
    middleName: Yup.string().nullable(),
    companyName: Yup.string().required(),
    site: Yup.string().nullable(),
    contactNumber: Yup.string().required(),
    registrationAddress: Yup.string().required(),
    zip: Yup.string().required(),
  })

  const onSubmit = (values: Values, action: FormikHelpers<Values>) => {
    console.log(values)
  }

  return (
    <>
      <div className="mb-8 text-center">
        <h1 className="my-3 text-4xl font-bold">Данные о компании</h1>
        <p className="text-sm text-coolGray-400">Войдите в систему для доступа к своему аккаунту</p>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={registrationSchema}
        onSubmit={(values, action) => onSubmit(values, action)}
      >
        <Form action="">
          <div className="flex flex-col gap-y-3">
            <TextField color="primary" label="Фамилия" name="lastName" required />
            <TextField color="primary" label="Имя" name="firstName" required />
            <TextField color="primary" label="Отчество" name="middleName" />
            <TextField color="primary" label="Названия, которое увидять покупатели" name="companyName" required />
            <TextField color="primary" label="Сайт" name="site" />
            <TextField color="primary" label="Контактный телефон" name="contactNumber" required type="tel" mask="+\9\96 (999) 99-99-99" placeholder="+996 (___) __-__-__" />
            <TextField color="primary" label="Адрес регистрации" name="registrationAddress" required />
            <TextField color="primary" label="Почтовый индекс" name="zip" required mask="999999" />
            <Button color="primary" type="submit" fullWidth>Зарегистрироваться</Button>
          </div>
        </Form>
      </Formik>
    </>
  );
};

export default StepThree;
