'use client';

import React from 'react';
import classNames from "classnames";
import InputMask from "react-input-mask";
import {InputProps} from "react-daisyui";
import {Input} from "@/lib/daisyUi";

interface TextFieldProps extends InputProps {
  label?: string;
  error?: boolean;
  message?: string;
  mask?: string;
}

const TextField: React.FC<TextFieldProps> = (props ) => {

  return (
    <div className="form-control w-full">

      {props.label &&
        <label className="label">
          <span className="label-text">{props.label}</span>
          <span className="label-text-alt"/>
        </label>
      }

      {!props.mask
        ? <Input color={props.error ? "error" : props.color} {...props}/>
        : <InputMask
          mask={props.mask}
          value={props.value}
          onChange={props.onChange}
        >
          <Input color={props.error ? "error" : props.color} {...props}/>
        </InputMask>
      }

      {!!props.message &&
        <label className="label">
          <span className="label-text-alt"/>
          <span className={classNames(
            "label-text-alt",
            props.error && "text-error",
          )}>{props.message}</span>
        </label>
      }
    </div>
  )
}

export default TextField;
