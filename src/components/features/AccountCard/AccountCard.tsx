import React from 'react';
import {Avatar as DaisyAvatar, Button} from "@/lib/daisyUi";
import {ArrowRightOnRectangleIcon} from "@heroicons/react/24/outline";
import {User} from "@/types/user";
import Avatar from "@/components/features/Avatar/Avatar";

interface Props {
  user: User
}

const AccountCard: React.FC<Props> = ({user}) => {

  return (
    <div className="flex gap-x-2">
      <div className="flex-none">
        <Avatar user={user} shape="circle" size="sm"/>
      </div>
      <div className="flex-1 flex flex-col justify-center font-bold">
        <Name user={user}/>
      </div>
      <div className="flex-none">
        <Button className="pr-0" color="ghost" variant="link">
          <ArrowRightOnRectangleIcon className="h-6 w-6"/>
        </Button>
      </div>
    </div>
  );
};

const Name: React.FC<{user: User}> = ({user}) => {
  if (user.name.firstName && user.name.lastName) {
    return (
      <>
        <span>{user.name.firstName}</span>
        <span>{user.name.lastName}</span>
      </>
    )
  } else if (user.email) {
    return <span>{user.email}</span>
  } else if (user.phone) {
    return <span>{user.phone.number}</span>
  } else {
    return <span>{user.login}</span>
  }
}

export default AccountCard;
