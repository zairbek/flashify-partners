import React from 'react';
import {Select, SelectProps} from "@/lib/daisyUi";
import cx from "classnames";

interface SelectFieldProps extends SelectProps {
  label?: string;
  error?: boolean;
  message?: string;
  mask?: string;
}

const SelectField: React.FC<SelectFieldProps> = (props) => {
  return (
    <div className="form-control w-full">

      {props.label &&
        <label className="label">
          <span className="label-text">{props.label}</span>
          <span className="label-text-alt"/>
        </label>
      }

      <Select color={props.error ? "error" : props.color} defaultValue={'default'} onChange={console.log} {...props}>
        <option value={'default'} disabled>
          Pick one
        </option>
        <option value="Star Wars">Star Wars</option>
        <option value="Harry Potter">Harry Potter</option>
        <option value="Lord of the Rings">Lord of the Rings</option>
        <option value="Planet of the Apes">Planet of the Apes</option>
        <option value="Star Trek">Star Trek</option>
      </Select>

      {!!props.message &&
        <label className="label">
          <span className="label-text-alt"/>
          <span className={cx(
            "label-text-alt",
            props.error && "text-error",
          )}>{props.message}</span>
        </label>
      }
    </div>
  );
};

export default SelectField;
