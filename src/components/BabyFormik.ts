import * as React from "react";

type ObjMap<O extends {}, T> = { [K in keyof O]: T };
type Shape<T> = Partial<T>;

// General type to describe form
export type BFValues<T> = ObjMap<T, string>;
export type BFErrors<T> = Shape<ObjMap<T, string>>;
type BFTouched<T> = Shape<ObjMap<T, boolean>>;
type BFState<T> = {
  values: BFValues<T>;
  errors: BFErrors<T>;
  touched: BFTouched<T>;
  isSubmitting: boolean;
};
export type BFValidate<T> = (values: BFValues<T>) => [BFErrors<T>, T | void];

// as of now consider only date input,
// but also should include select, checkbox and other
const isDiscrete = (type: string) => type === "date";

export interface BFChildren<T> extends BFState<T> {
  handleSubmit: (e: React.FormEvent<HTMLInputElement>) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  prefetchIfValid: () => void;
}

export type BFProps<T> = {
  submit: (T) => void;
  prefetch: (T) => void;
  initialValues: BFValues<T>;
  validate: BFValidate<T>;
  children: (a: BFChildren<T>) => React.ReactNode;
};

export default class BabyFormik<T extends {}> extends React.Component<
  BFProps<T>,
  BFState<T>
> {
  constructor(props: BFProps<T>) {
    super(props);
    this.state = {
      values: props.initialValues,
      errors: {},
      touched: {},
      isSubmitting: false
    };
  }
  handleSubmit = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    const [errors, form] = this.props.validate(this.state.values);
    if (form) {
      this.setState({ isSubmitting: true });
      this.props.submit(form);
    } else {
      this.setState({
        errors,
        touched: Object.keys(errors).reduce(
          (acc, key) => ({ ...acc, [key]: true }),
          {}
        )
      });
    }
  };
  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    // Object.assign because spread doesn't work https://github.com/Microsoft/TypeScript/issues/10727
    const values: BFValues<T> = Object.assign({}, this.state.values, {
      [name]: value
    });
    this.setState({ values });
    if (isDiscrete(type)) {
      this.validateAndPrefetch(values);
    }
  };
  handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, type } = e.target;
    const [errors, form] = this.props.validate(this.state.values);
    this.setState({
      // Object.assign because spread doesn't work https://github.com/Microsoft/TypeScript/issues/10727
      touched: Object.assign({}, this.state.touched, { [name]: true }),
      errors
    });
    if (!isDiscrete(type)) if (form) this.props.prefetch(form);
  };
  validateAndPrefetch = (values: BFValues<T>) => {
    const [errors, form] = this.props.validate(values);
    if (form) this.props.prefetch(form);
  };
  prefetchIfValid = () => {
    this.validateAndPrefetch(this.state.values);
  };
  render() {
    const { handleSubmit, handleChange, handleBlur, prefetchIfValid } = this;
    return this.props.children({
      ...this.state,
      handleSubmit,
      handleChange,
      handleBlur,
      prefetchIfValid
    });
  }
}
