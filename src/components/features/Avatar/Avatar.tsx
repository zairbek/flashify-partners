import React from 'react';
import {User} from "@/types/user";
import {Avatar as DaisyAvatar} from "@/lib/daisyUi";
import {AvatarProps as DaisyAvatarProps} from "react-daisyui/dist/Avatar";

interface AvatarProps extends DaisyAvatarProps{
  user: User
}

const Avatar: React.FC<AvatarProps> = ({user, ...props}) => {
  let letter = ''
  if (user.name.firstName && user.name.lastName) {
    letter = user.name.firstName.slice(0,1) + user.name.lastName.slice(0,1)
  } else if (user.name.firstName && !user.name.lastName) {
    letter = user.name.firstName.slice(0,2)
  } else if (!user.name.firstName && user.name.lastName) {
    letter = user.name.lastName.slice(0,2)
  } else if (user.email) {
    letter = user.email.slice(0,2)
  } else if (user.phone) {
    letter = user.phone.number.slice(0,2)
  } else if (user.login) {
    letter = user.login.slice(0,2)
  }

  return (
    <DaisyAvatar letters={letter.toUpperCase()} {...props}/>
  );
};

export default Avatar;
