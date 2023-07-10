'use client'

import {useRouter} from "next/navigation";
import {Link, Divider, Card} from '@/lib/daisyUi'
import React, {useState} from "react";
import {useSession} from "next-auth/react";
import RequestCode from "@/components/features/Auth/Phone/RequestCode";
import SignIn from "@/components/features/Auth/Phone/SignIn";

export default function Auth() {
  const router = useRouter()
  const [confirmationForm, setConfirmationForm] = useState<boolean>(false)
  const [phone, setPhone] = useState<string>('')

  const session = useSession();
  if (session.status === 'authenticated') {
    router.push('/dashboard')
  }

  const toNextStep = (phone: string) => {
    setPhone(phone)
    setConfirmationForm(true);
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

            {!confirmationForm
              ? <RequestCode toNextStep={toNextStep}/>
              : <SignIn phone={phone}/>
            }

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

