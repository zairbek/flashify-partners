'use client'

import {useRouter} from "next/navigation";
import {Steps, Link, Divider, Card} from '@/lib/daisyUi'
import React, {useState} from "react";
import StepOne from "@/components/features/RegistrationForm/StepOne";
import StepTwo from "@/components/features/RegistrationForm/StepTwo";
import StepThree from "@/components/features/RegistrationForm/StepThree";
import StepZero from "@/components/features/RegistrationForm/StepZero";

export default function RegistrationContinue() {
  const router = useRouter()
  const [step, setStep] = useState(1);

  return (
    <>
      <Card compact className="bg-base-100 md:w-[34rem] p-6 sm:p-10 relative">
        <Card.Body>
          <div className="flex flex-col w-full ">

            {/*<Steps className="mb-10">*/}
            {/*  <Steps.Step color={step >= 1 && 'primary'}>Создание аккаунта</Steps.Step>*/}
              {/*<Steps.Step color={step >= 2 && 'primary'}>Информация о{'\u00A0'}магазине</Steps.Step>*/}
              {/*<Steps.Step color={step >= 3 && 'primary'}>Данные о{'\u00A0'}компании</Steps.Step>*/}
              {/*<Steps.Step color={step >= 3 && 'primary'}>Финиш</Steps.Step>*/}
            {/*</Steps>*/}

            <StepZero onNextStep={() => setStep(2)}/>

            {/*{step === 1*/}
            {/*  ? <StepOne onNextStep={() => setStep(2)}/>*/}
            {/*  : <StepTwo onNextStep={() => setStep(3)}/>*/}
            {/*     : <StepThree/>*/}
            {/*}*/}

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

