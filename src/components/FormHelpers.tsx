import * as React from "react";
import { IBFChildren } from "./BabyFormik";

interface InputProps<T extends { [x: string]: any }> extends IBFChildren<T> {
  type: "text" | "date";
  name: Extract<keyof T, string>;
}

export const Input = <T extends { [x: string]: any }>({
  name,
  type,
  errors,
  touched,
  values,
  handleBlur,
  handleChange
}: InputProps<T>) => {
  return (
    <div>
      <input
        type={type}
        name={name}
        onChange={handleChange}
        onBlur={handleBlur}
        value={values[name]}
      />
      {errors[name] && touched[name] && errors[name]}
    </div>
  );
};

export const Submit = <T extends {}>({ prefetchIfValid }: IBFChildren<T>) => (
  <div className="buttonArea" onMouseEnter={prefetchIfValid}>
    <button type="submit">Search</button>
  </div>
);

interface IFormProps<T> extends IBFChildren<T> {
  children: React.ReactNode;
}
export const Form = <T extends {}>({
  handleSubmit,
  children
}: IFormProps<T>) => <form onSubmit={handleSubmit}>{children}</form>;
