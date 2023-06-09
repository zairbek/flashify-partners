'use client'

import TextField from "@/components/shared/Forms/TextField/TextField";
import {useRouter} from "next/navigation";
import {Button, Link, Divider, Card} from '@/lib/daisyUi'
import SelectField from "@/components/shared/Forms/SelectField/SelectField";

export default function Registration() {
  const router = useRouter()

  return (
    <>
      <Card compact className="bg-base-100 w-[34rem] p-6 sm:p-10 relative">
        <Card.Body>
          <div className="mb-8 text-center">
            <h1 className="my-3 text-4xl font-bold">Регистрация</h1>
            <p className="text-sm text-coolGray-400">Войдите в систему для доступа к своему аккаунту</p>
          </div>

          <div className="flex flex-col w-full border-opacity-50">
            <form action="">
              <div className="flex flex-col gap-y-3">

                <SelectField color="primary" name="type" label="Тип оргонизации" />
                <TextField color="primary" label="ИНН" name="inn"/>
                <SelectField color="primary" name="type" label="Регион работы" />
                <TextField color="primary" label="Юридическое название компании" name="companyName" message="sdfas" error/>
                <SelectField color="primary" name="type" label="Категория товаров" />
                <TextField color="primary" label="Названия, которое увидять покупатели" name="companyName"/>
                <Button color="primary" fullWidth>Зарегистрироваться</Button>

              </div>
            </form>

            <Divider>или</Divider>

            <div className="flex flex-col gap-2">
              <p className="text-sm text-center">
                <Link color="primary" type="button" onClick={() => router.push('/auth')}>Войти по номеру телефона</Link>
              </p>
              <p className="text-sm text-center">
                <Link color="primary" type="button" onClick={() => router.push('/auth/email')}>Войти по почте</Link>
              </p>
            </div>
          </div>
        </Card.Body>
      </Card>
    </>
  )
};

