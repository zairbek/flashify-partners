'use client'

import {useRouter} from "next/navigation";
import {Link, Divider, Card} from '@/lib/daisyUi'
import React, {useState} from "react";
import {useSession} from "next-auth/react";
import SignUp from "@/components/features/Register/Phone/SignUp";
import RequestCode from "@/components/features/Register/Phone/RequestCode";

export default function Registration() {
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
      <Card compact className="bg-base-100 md:w-[34rem] p-6 sm:p-10 relative">
        <Card.Body>
          <div className="mb-8 text-center">
            <h1 className="my-3 text-4xl font-bold">Войти</h1>
            <p className="text-sm text-coolGray-400">Войдите в систему для доступа к своему аккаунту</p>
          </div>

          {!confirmationForm
            ? <RequestCode toNextStep={toNextStep}/>
            : <SignUp phone={phone}/>
          }

          <Divider>или</Divider>

          <div className="flex flex-col gap-2">
            <p className="text-sm text-center">
              <Link color="primary" type="button" onClick={() => router.push('/auth')}>Войти по номеру телефона</Link>
            </p>
            <p className="text-sm text-center">
              <Link color="primary" type="button" onClick={() => router.push('/auth/email')}>Войти по почте</Link>
            </p>
          </div>

        </Card.Body>
      </Card>
    </>
  )
};

