'use client'

import TextField from "@/components/shared/Forms/TextField/TextField";
import {useRouter} from "next/navigation";
import {Button, Link, Divider, Card} from '@/lib/daisyUi'

export default function Registration() {
  const router = useRouter()

  return (
    <>
      <Card compact className="bg-base-100 w-[24rem] p-6 sm:p-10 relative">
        <Card.Body>
          <div className="mb-8 text-center">
            <h1 className="my-3 text-4xl font-bold">Войти</h1>
            <p className="text-sm text-coolGray-400">Войдите в систему для доступа к своему аккаунту</p>
          </div>

          <div className="flex flex-col w-full border-opacity-50">
            <form action="">
              <div className="flex flex-col gap-y-6">
                <div>
                  <TextField
                    label="Email"
                    type="email"
                    name="phone"
                    placeholder="john@mail.com"
                  />
                </div>
                <div>
                  <Button color="primary" fullWidth>Войти</Button>
                </div>
              </div>
            </form>

            <Divider>или</Divider>

            <div className="flex flex-col gap-2">
              <p className="text-sm text-center">
                <Link color="primary" type="button" onClick={() => router.push('/auth')}>Войти по номеру телефона</Link>
              </p>
              <p className="text-sm text-center">
                <Link color="primary" type="button" onClick={() => router.push('/auth/registration')}>Зарегистрироваться</Link>
              </p>
            </div>
          </div>
        </Card.Body>
      </Card>
    </>
  )
};

