'use client';

import React from 'react';
import classNames from "classnames";
import InputMask from "react-input-mask";
import {InputProps} from "react-daisyui";
import {Input} from "@/lib/daisyUi";
import {useField} from "formik";

interface TextFieldProps extends InputProps {
  label?: string;
  error?: boolean;
  message?: string;
  mask?: string;
}

const TextField: React.FC<TextFieldProps> = (props ) => {
  const [field, meta, helpers] = useField(props);

  return (
    <div className="form-control w-full">

      {props.label &&
        <label className="label">
          <span className="label-text">{props.label}
            {props.required && <span className="ml-1 text-red-500">*</span>}
          </span>
          <span className="label-text-alt"/>
        </label>
      }

      {!props.mask
        ? <Input color={meta.touched && meta.error ? "error" : props.color} readOnly={props.readOnly} {...field}/>
        : <InputMask
          mask={props.mask}
          placeholder={props.placeholder}
          readOnly={props.readOnly}
          {...field}
        >
          <Input color={meta.touched && meta.error ? "error" : props.color} type={props.type} readOnly={props.readOnly} {...field}/>
        </InputMask>
      }

      {!!(meta.touched && meta.error) &&
        <label className="label">
          <span className="label-text-alt"/>
          <span className={classNames(
            "label-text-alt",
            meta.touched && meta.error && "text-error",
          )}>{meta.error}</span>
        </label>
      }
    </div>
  )
}

export default TextField;
