import React from 'react';
import {Avatar, Button} from "@/lib/daisyUi";
import {ArrowRightOnRectangleIcon} from "@heroicons/react/24/outline";

const AccountCard = () => {
  return (
    <div className="flex gap-x-2">
      <div className="flex-none">
        <Avatar src="http://daisyui.com/tailwind-css-component-profile-1@94w.png" shape="circle" size="sm"/>
      </div>
      <div className="flex-1 flex flex-col justify-center font-bold">
        <span>Заирбек</span>
        <span>Нурмухамадов</span>
      </div>
      <div className="flex-none">
        <Button className="pr-0">
          <ArrowRightOnRectangleIcon className="h-6 w-6"/>
        </Button>
      </div>
    </div>
  );
};

export default AccountCard;
