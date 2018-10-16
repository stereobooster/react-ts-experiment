import * as React from "react";
import StepOneForm from "./components/StepOneForm";

class App extends React.Component {
  public render() {
    return (
      <StepOneForm
        submit={() => {}}
        prefetch={() => {}}
        form={undefined}
      />
    );
  }
}

export default App;
