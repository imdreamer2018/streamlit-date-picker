import {
  Streamlit,
  StreamlitComponentBase,
} from "streamlit-component-lib"
import React, {ComponentProps, ReactNode} from "react"
import { DatePicker as DATE_PICKER, TimePicker, DatePickerProps } from 'antd';
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

import 'dayjs/locale/zh-cn';
import 'dayjs/plugin/utc';
import 'dayjs/plugin/timezone';
import 'dayjs/plugin/localeData';
import {FormatString, getFormatString, getPickerType, PickerType} from "./utils";

dayjs.extend(utc);
dayjs.extend(timezone);

dayjs.tz.setDefault('Asia/Shanghai');


interface State {
    picker_type: PickerType,
    format_string: FormatString
    value: dayjs.Dayjs,
}
export class DatePicker extends StreamlitComponentBase<State> {


    constructor(props: ComponentProps<any>) {
        super(props);
        this.state = {
            picker_type: getPickerType(this.props.args["picker_type"]) || PickerType.date,
            format_string: getFormatString(this.props.args["picker_type"]) || FormatString.date,
            value: dayjs(this.props.args["value"] * 1000),
        }
        this.setComponentValue()
    }

    private setComponentValue = () => {
        Streamlit.setComponentValue(this.state.value.format(this.state.format_string))
    }

    public render = (): ReactNode => {
        return (
            <div style={{ height: '50px' }}>
                {this.state.picker_type === "time" &&
                    <TimePicker
                           format={this.state.format_string}
                           onChange={this._onChange}
                           placement={"bottomLeft"}
                           onOpenChange={this._onOpenChange}
                           value={this.state.value}
                    />
                }
                {this.state.picker_type !== "time" &&
                    <DATE_PICKER
                           picker={this.state.picker_type}
                           format={this.state.format_string}
                           onChange={this._onChange}
                           placement={"bottomLeft"}
                           onOpenChange={this._onOpenChange}
                           value={this.state.value}
              />}
            </div>
        )
    }

    private _onChange = (date: any, dateString: any) => {
        this.setState({
            value: date
        });
        Streamlit.setComponentValue(dateString)
    }

    private _onOpenChange: DatePickerProps['onOpenChange'] = (isOpen) => {
        Streamlit.setFrameHeight(450);
        super.componentDidUpdate();
    }
}