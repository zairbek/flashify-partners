import React from 'react';
import {Button, Alert as DaisyAlert, Toast as DaisyToast} from "@/lib/daisyUi";
import {ToastProps as DaisyToastProps} from "react-daisyui";
import {NoSymbolIcon} from "@heroicons/react/20/solid";
import {ComponentStatus} from "react-daisyui/dist/types";
import {CheckIcon, ExclamationTriangleIcon, InformationCircleIcon} from "@heroicons/react/24/outline";

interface ToastProps extends DaisyToastProps {
  alerts: AlertMessage[]
  handleRemove(index: number): void
}

export interface AlertMessage {
  title: string,
  text?: string
  status: ComponentStatus,
}

const Toast: React.FC<ToastProps> = ({alerts, handleRemove, ...props}) => {
  return (
    <DaisyToast {...props}>
      {alerts.map((message, index) => (
        <DaisyAlert
          key={index}
          icon={<StatusIcon status={message.status}/>}
          status={message.status}
          innerClassName='flex flex-row items-center gap-2'
          className="gap-0"
        >
          <div className="w-full flex-row justify-between gap-2">
            <h3 className="text-lg font-bold">{message.title}</h3>
            <h4>{message.text}</h4>
            <h4>{message.text}</h4>
          </div>

          <Button color="ghost" onClick={() => handleRemove(index)}>X</Button>
        </DaisyAlert>
      ))}
    </DaisyToast>
  );
};


interface StatusIconProps {
  status: ComponentStatus
}

const StatusIcon: React.FC<StatusIconProps> = ({status}) => {
  switch (status) {
    case "success":
      return <CheckIcon className="w-16 h-16 mx-2 stroke-current"/>
    case "warning":
      return <ExclamationTriangleIcon className="w-16 h-16 mx-2 stroke-current"/>
    case "error":
      return <NoSymbolIcon className="w-16 h-16 mx-2 stroke-current"/>
    case "info":
      return <InformationCircleIcon className="w-16 h-16 mx-2 stroke-current"/>
  }
}

export default Toast;
