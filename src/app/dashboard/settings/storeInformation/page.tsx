'use client'

import React from "react";
import {Divider, Avatar, Button} from "@/lib/daisyUi";
import FileField from "@/components/shared/Forms/FileField/FileField";
import {Form, Formik, FormikHelpers, FormikValues} from "formik";
import SelectField from "@/components/shared/Forms/SelectField/SelectField";
import TextField from "@/components/shared/Forms/TextField/TextField";
import {ObjectSchema} from "yup";
import * as Yup from "yup";



interface Values {
  organizationType: string;
  inn: string;
  regionOfWork: string;
  legalCompanyName: string;
  productCategory: string;
  companyName: string;
}


interface LogoValues {
  logo: string;
}


export default function StoreInformation() {
  const logoForm: {
    initialValues: LogoValues,
    onSubmit(values: LogoValues, action: FormikHelpers<LogoValues>): void
  } = {
    initialValues: {
      logo: ''
    },
    onSubmit: (values, action) => {

    }
  }


  const otherData: {
    initialValues: Values
    validationSchema: ObjectSchema<Values>
    onSubmit(values: Values, action: FormikHelpers<Values>): void
  } = {
    initialValues: {
      productCategory: 'Авто',
      organizationType: 'ЧП',
      inn: '',
      regionOfWork: '',
      legalCompanyName: '',
      companyName: '',
    },
    validationSchema: Yup.object().shape({
      organizationType: Yup.string().required(),
      inn: Yup.string().required(),
      regionOfWork: Yup.string().required(),
      legalCompanyName: Yup.string().required(),
      productCategory: Yup.string().required(),
      companyName: Yup.string().required(),
    }),
    onSubmit: (values, action) => {
      console.log(values)
    }
  }


  return (
    <>
      <h1 className="text-lg font-bold p-2">Информации о магазине</h1>
      <Divider className="my-0"/>

      <Formik
        initialValues={logoForm.initialValues}
        onSubmit={logoForm.onSubmit}
      >
        <Form>
          <Avatar src="http://daisyui.com/tailwind-css-component-profile-1@94w.png"/>
          <FileField size="sm" name="logo"/>
        </Form>
      </Formik>

      <Formik
        initialValues={otherData.initialValues}
        validationSchema={otherData.validationSchema}
        onSubmit={otherData.onSubmit}
      >
        <Form className="max-w-[50%]">
          <div className="flex flex-col gap-y-3">
            <TextField color="primary" label="Категория товаров" name="productCategory" alt="Нельзя изменить поля" readOnly />
            <TextField color="primary" label="Тип организации" name="organizationType" alt="Нельзя изменить поля" readOnly />
            <TextField color="primary" label="Названия, которое увидять покупатели" required name="companyName" />
            <TextField color="primary" label="Юридическое название компании" required name="legalCompanyName" />
            <TextField color="primary" label="ИНН" required name="inn" />
            <SelectField color="primary" label="Регион работы" required name="regionOfWork">
              <option value="" disabled>Выбрать</option>
              <option value="bishkek">Бишкек</option>
              <option value="osh">Ош</option>
              <option value="talas">Талас</option>
            </SelectField>

            <Button color="primary" type="submit">Сохранить</Button>
          </div>
        </Form>
      </Formik>

    </>
  )
}
