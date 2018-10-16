import * as React from "react";
import { IFruitForm, FruitForm } from "./FruitForm";
// import format from "date-fns/format";
// import parse from "date-fns/parse";
import BabyFormik, { BFValidate } from "./BabyFormik";
import { Input, Submit, Form } from "./FormHelpers";

const validate: BFValidate<IFruitForm> = values => {
  const result = FruitForm.decode(values);
  return result.bimap(
    errors => {
      // well, this is not how it supposed to be done
      return errors
        .map(x => [x.context.map(x => x.key).join(""), x.context[1].type.name])
        .reduce((acc, val) => {
          acc[val[0]] = val[1];
          return acc;
        }, {});
    },
    x => x
  );
};

const formToValues = (form: IFruitForm | void) =>
  form
    ? FruitForm.encode(form)
    : {
        name: "",
        start: ""
      };

type Props = {
  submit: (form: IFruitForm) => void;
  prefetch: (form: IFruitForm) => void;
  form: IFruitForm | void;
};

class StepOne extends React.Component<Props, {}> {
  render() {
    return (
      <BabyFormik
        validate={validate}
        prefetch={this.props.prefetch}
        submit={this.props.submit}
        initialValues={formToValues(this.props.form)}
      >
        {options => (
          <Form {...options}>
            <Input type="text" name="name" {...options} />
            <Input type="date" name="start" {...options} />
            <Submit {...options} />
          </Form>
        )}
      </BabyFormik>
    );
  }
}

export default StepOne;
