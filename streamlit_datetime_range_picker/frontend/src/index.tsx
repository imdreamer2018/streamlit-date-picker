import React from "react"
import ReactDOM from "react-dom"
import {ComponentProps, withStreamlitConnection} from "streamlit-component-lib";
import {DateRangePicker} from "./RangePicker";
import {DatePicker} from "./DatePicker";

const DatePickerComponent = (props: ComponentProps) => {
    const id = props.args['id']
    switch (id) {
        case 'date_range_picker':
            return (
                <DateRangePicker {...props}/>
            );
        case 'date_picker':
            return (
                <DatePicker {...props}/>
            );
    }
};

//wrap component
// @ts-ignore
const StreamlitDatePickerComponent = withStreamlitConnection(DatePickerComponent)

ReactDOM.render(
  <React.StrictMode>
      <StreamlitDatePickerComponent/>
  </React.StrictMode>,
  document.getElementById("root")
);