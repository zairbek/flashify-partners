import React from 'react';
import {Select, SelectProps} from "@/lib/daisyUi";
import classNames from "classnames";
import {useField} from "formik";

interface SelectFieldProps extends SelectProps {
  label?: string;
  error?: boolean;
  message?: string;
}

const SelectField: React.FC<SelectFieldProps> = (props) => {
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

      <Select color={meta.touched && meta.error ? "error" : props.color} {...field}>
        <option value={'default'} disabled>
          Pick one
        </option>
        <option value="Star Wars">Star Wars</option>
        <option value="Harry Potter">Harry Potter</option>
        <option value="Lord of the Rings">Lord of the Rings</option>
        <option value="Planet of the Apes">Planet of the Apes</option>
        <option value="Star Trek">Star Trek</option>
      </Select>

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
  );
};

export default SelectField;
