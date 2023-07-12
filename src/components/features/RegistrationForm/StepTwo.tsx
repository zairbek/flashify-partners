import React from 'react';
import * as Yup from "yup";
import {Field, Form, Formik, FormikHelpers, FormikValues} from "formik";
import SelectField from "@/components/shared/Forms/SelectField/SelectField";
import TextField from "@/components/shared/Forms/TextField/TextField";
import {Button} from "@/lib/daisyUi";
import {ObjectSchema} from "yup";

interface StepTwoProps {
  onNextStep(): void;
}

interface Values {
  // organizationType: string;
  // inn: string;
  regionOfWork: string;
  // legalCompanyName: string;
  // productCategory: string;
  companyName: string;
}

const StepTwo: React.FC<StepTwoProps> = ({onNextStep}) => {
  const initialValues: Values = {
    // organizationType: '',
    // inn: '',
    regionOfWork: '',
    // legalCompanyName: '',
    // productCategory: '',
    companyName: '',
  }

  const registrationSchema: ObjectSchema<Values> = Yup.object().shape({
    // organizationType: Yup.string().required(),
    // inn: Yup.string().required(),
    regionOfWork: Yup.string().required(),
    // legalCompanyName: Yup.string().required(),
    // productCategory: Yup.string().required(),
    companyName: Yup.string().required(),
  })

  const onSubmit = (values: FormikValues, action: FormikHelpers<Values>) => {
    console.log(values)
    onNextStep()
  }


  return (
    <>
      <div className="mb-8 text-center">
        <h1 className="my-3 text-4xl font-bold">Информация о{'\u00A0'}магазине</h1>
        <p className="text-sm text-coolGray-400">Войдите в систему для доступа к своему аккаунту</p>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={registrationSchema}
        onSubmit={(values: Values, action: FormikHelpers<Values>) => onSubmit(values, action)}
      >
        <Form action="">
          <div className="flex flex-col gap-y-3">
            {/*<SelectField color="primary" label="Категория товаров" required name="productCategory">*/}
            {/*  <option value="" disabled>Выбрать</option>*/}
            {/*  <option value="avto">Авто</option>*/}
            {/*  <option value="moto">Moto</option>*/}
            {/*</SelectField>*/}
            <SelectField color="primary" label="Регион работы" required name="regionOfWork">
              <option value="" disabled>Выбрать</option>
              <option value="bishkek">Бишкек</option>
              <option value="osh">Ош</option>
              <option value="talas">Талас</option>
            </SelectField>
            <TextField color="primary" label="Названия, которое увидять покупатели" required name="companyName" />
            {/*<SelectField color="primary" label="Тип организации" required name="organizationType">*/}
            {/*  <option value="" disabled>Выбрать</option>*/}
            {/*  <option value="chp">ЧП</option>*/}
            {/*</SelectField>*/}
            {/*<TextField color="primary" label="Юридическое название компании" required name="legalCompanyName" />*/}
            {/*<TextField color="primary" label="ИНН" required name="inn" />*/}
            <Button color="primary" type="submit" fullWidth>Следующий шаг</Button>
          </div>
        </Form>
      </Formik>
    </>
  );
};

export default StepTwo;
