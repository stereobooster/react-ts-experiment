import * as React from "react";
// import { connect } from "react-redux";
import StepOneForm from "./StepOneForm";
import { IFruitForm } from "./FruitForm";
// import { Dispatch,  State } from "src/redux";
// import { prefetch } from "src/api/fruitRequest";

type Props = {
  // state: State;
  submit: (form: IFruitForm) => void;
  prefetch: (form: IFruitForm) => void;
};

export const StepOne = ({ submit, /*state,*/ prefetch }: Props) => (
  <React.Fragment>
    <StepOneForm
      submit={submit}
      prefetch={prefetch}
      form={undefined}
      // stateState={state.state}
      // form={state.form ? state.form : undefined}
    />
  </React.Fragment>
);

// export default connect(
//   (state: State) => ({ state }),
//   (dispatch: Dispatch) => ({
//     submit: (form: FruitForm) => dispatch({ type: "SUBMIT_FRUIT", form }),
//     prefetch
//   })
// )(StepOne);
