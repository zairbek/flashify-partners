'use client';

import React from 'react';
import classNames from "classnames";
import InputMask from "react-input-mask";
import {InputProps} from "react-daisyui";
import {Input, FileInput} from "@/lib/daisyUi";
import {useField} from "formik";

interface FileFieldProps extends InputProps {
  label?: string;
  error?: boolean;
  message?: string;
  mask?: string;
}

const FileField: React.FC<FileFieldProps> = (props ) => {
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

      <FileInput color={meta.touched && meta.error ? "error" : props.color} size={props.size} readOnly={props.readOnly} {...field}/>

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

export default FileField;
